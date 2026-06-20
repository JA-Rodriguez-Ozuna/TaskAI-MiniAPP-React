export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'trabajo' | 'personal' | 'estudio' | 'urgente';
  priority: 'alta' | 'media' | 'baja';
  isCompleted: boolean;
  userId: string;
  createdAt: Date;
  dueDate?: Date;
}
