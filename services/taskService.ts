import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import { Task } from '../types/task';

export function subscribeToTasks(
  userId: string,
  callback: (tasks: Task[]) => void
): Unsubscribe {
  const tasksRef = collection(db, 'users', userId, 'tasks');
  const q = query(tasksRef, orderBy('createdAt', 'desc'));

  console.log('[TaskService] subscribeToTasks → userId:', userId, '| path: users/' + userId + '/tasks');

  return onSnapshot(q, (snapshot) => {
    const tasks: Task[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        isCompleted: data.isCompleted,
        userId: data.userId,
        createdAt: (data.createdAt as Timestamp).toDate(),
        dueDate: data.dueDate ? (data.dueDate as Timestamp).toDate() : undefined,
      };
    });
    callback(tasks);
  });
}

export async function addTask(task: Omit<Task, 'id'>): Promise<void> {
  const tasksRef = collection(db, 'users', task.userId, 'tasks');
  console.log('[TaskService] addTask → path: users/' + task.userId + '/tasks | data:', JSON.stringify({ ...task, createdAt: task.createdAt.toISOString() }));
  await addDoc(tasksRef, {
    ...task,
    createdAt: Timestamp.fromDate(task.createdAt),
    ...(task.dueDate ? { dueDate: Timestamp.fromDate(task.dueDate) } : {}),
  });
}

export async function toggleComplete(
  taskId: string,
  userId: string,
  current: boolean
): Promise<void> {
  const taskRef = doc(db, 'users', userId, 'tasks', taskId);
  await updateDoc(taskRef, { isCompleted: !current });
}
