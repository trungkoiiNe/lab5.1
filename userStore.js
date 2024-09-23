import create from 'zustand';
import firestore from "@react-native-firebase/firestore";

const useUserStore = create((set, get) => ({
  users: [],
  name: '',
  email: '',
  age: '',
  editingId: null,
  isLoading: false,

  setUsers: (users) => set({ users }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setAge: (age) => set({ age }),
  setEditingId: (editingId) => set({ editingId }),
  setIsLoading: (isLoading) => set({ isLoading }),

  fetchUsers: () => {
    set({ isLoading: true });
    const subscriber = firestore()
      .collection("users")
      .onSnapshot(
        (querySnapshot) => {
          const users = [];
          querySnapshot.forEach((documentSnapshot) => {
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          set({ users, isLoading: false });
        },
        (error) => {
          console.error("Error fetching users:", error);
          set({ isLoading: false });
        }
      );
    return subscriber;
  },

  addUser: () => {
    const { name, email, age, setName, setEmail, setAge } = get();
    set({ isLoading: true });
    return firestore()
      .collection("users")
      .add({
        name: name.trim(),
        email: email.trim(),
        age: parseInt(age.trim()),
      })
      .then(() => {
        setName('');
        setEmail('');
        setAge('');
      })
      .finally(() => set({ isLoading: false }));
  },

  editUser: (id) => {
    const { name, email, age, setName, setEmail, setAge, setEditingId } = get();
    set({ isLoading: true });
    return firestore()
      .collection("users")
      .doc(id)
      .update({
        name: name.trim(),
        email: email.trim(),
        age: parseInt(age.trim()),
      })
      .then(() => {
        setEditingId(null);
        setName('');
        setEmail('');
        setAge('');
      })
      .finally(() => set({ isLoading: false }));
  },

  deleteUser: (id) => {
    set({ isLoading: true });
    return firestore()
      .collection("users")
      .doc(id)
      .delete()
      .finally(() => set({ isLoading: false }));
  },
}));

export default useUserStore;