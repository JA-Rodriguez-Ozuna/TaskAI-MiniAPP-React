import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string, userId: string, current: boolean) => void;
}

const CATEGORY_COLORS: Record<Task['category'], string> = {
  trabajo: '#DBEAFE',
  personal: '#DCFCE7',
  estudio: '#EDE9FE',
  urgente: '#FEE2E2',
};

const PRIORITY_COLORS: Record<Task['priority'], string> = {
  alta: '#EF4444',
  media: '#EAB308',
  baja: '#22C55E',
};

export default function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(task.id, task.userId, task.isCompleted)}
      >
        <View style={[styles.checkboxInner, task.isCompleted && styles.checkboxChecked]}>
          {task.isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, task.isCompleted && styles.titleCompleted]}>
          {task.title}
        </Text>
        {task.description ? (
          <Text style={[styles.description, task.isCompleted && styles.textCompleted]} numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: CATEGORY_COLORS[task.category] }]}>
            <Text style={styles.badgeText}>{task.category}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: PRIORITY_COLORS[task.priority] }]}>
            <Text style={[styles.badgeText, styles.priorityText]}>{task.priority}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6B5AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6B5AED',
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  textCompleted: {
    opacity: 0.5,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  priorityText: {
    color: '#fff',
  },
});
