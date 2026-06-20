import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  Alert,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { subscribeToTasks, toggleComplete } from '../../services/taskService';
import TaskCard from '../../components/TaskCard';
import { Task } from '../../types/task';

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const userId = auth.currentUser?.uid ?? '';

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = subscribeToTasks(userId, (fetched) => {
      setTasks(fetched);
      setLoading(false);
      setRefreshing(false);
    });
    return unsubscribe;
  }, [userId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const handleToggle = async (taskId: string, uid: string, current: boolean) => {
    try {
      await toggleComplete(taskId, uid, current);
    } catch {
      Alert.alert('Error', 'No se pudo actualizar la tarea');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TaskAI</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
          <Text style={styles.signOutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6B5AED" />
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskCard task={item} onToggle={handleToggle} />}
          contentContainerStyle={tasks.length === 0 ? styles.centered : styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6B5AED"
              colors={['#6B5AED']}
            />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tienes tareas aún. ¡Crea una!</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6B5AED',
  },
  signOutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B5AED',
  },
  signOutText: {
    color: '#6B5AED',
    fontSize: 14,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 60,
  },
});
