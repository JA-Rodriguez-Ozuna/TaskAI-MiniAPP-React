import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../services/firebase';
import { addTask } from '../../services/taskService';
import { Task } from '../../types/task';

const CATEGORIES: Task['category'][] = ['trabajo', 'personal', 'estudio', 'urgente'];
const PRIORITIES: Task['priority'][] = ['alta', 'media', 'baja'];

const PRIORITY_COLORS: Record<Task['priority'], string> = {
  alta: '#EF4444',
  media: '#EAB308',
  baja: '#22C55E',
};

export default function CreateTaskScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Task['category']>('personal');
  const [priority, setPriority] = useState<Task['priority']>('media');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Campo requerido', 'El título de la tarea es obligatorio');
      return;
    }
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    setSaving(true);
    try {
      await addTask({
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        isCompleted: false,
        userId,
        createdAt: new Date(),
      });
      setTitle('');
      setDescription('');
      setCategory('personal');
      setPriority('media');
      router.push('/');
    } catch {
      Alert.alert('Error', 'No se pudo guardar la tarea, intenta de nuevo');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nueva tarea</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          placeholder="¿Qué necesitas hacer?"
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Detalles adicionales (opcional)"
          placeholderTextColor="#9CA3AF"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          maxLength={300}
        />

        <Text style={styles.label}>Categoría</Text>
        <View style={styles.selectorRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.selectorBtn, category === cat && styles.selectorBtnActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.selectorText, category === cat && styles.selectorTextActive]}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Prioridad</Text>
        <View style={styles.selectorRow}>
          {PRIORITIES.map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.selectorBtn,
                priority === p && { backgroundColor: PRIORITY_COLORS[p], borderColor: PRIORITY_COLORS[p] },
              ]}
              onPress={() => setPriority(p)}
            >
              <Text style={[styles.selectorText, priority === p && styles.selectorTextActive]}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>Guardar tarea</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#1F2937',
    backgroundColor: '#fff',
  },
  inputMultiline: {
    height: 90,
    paddingTop: 12,
  },
  selectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectorBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  selectorBtnActive: {
    backgroundColor: '#6B5AED',
    borderColor: '#6B5AED',
  },
  selectorText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  selectorTextActive: {
    color: '#fff',
  },
  saveBtn: {
    backgroundColor: '#6B5AED',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  saveBtnDisabled: {
    opacity: 0.7,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
