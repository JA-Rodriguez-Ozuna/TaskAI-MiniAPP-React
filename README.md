# TaskAI Mini-App — React Native

Mini-aplicación móvil en **React Native + Expo** que se conecta al mismo Firebase de la app Flutter principal de TaskAI. Permite gestionar tareas universitarias en tiempo real.

## Tecnologías

- **React Native** 0.85 + **Expo** 56
- **Expo Router** (navegación basada en archivos)
- **Firebase Auth** (autenticación por email/contraseña)
- **Cloud Firestore** (sincronización en tiempo real)
- **TypeScript** con modo estricto

## Requisitos previos

- Node.js 18+
- Expo Go instalado en tu teléfono ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
- O un emulador Android/iOS configurado

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/JA-Rodriguez-Ozuna/TaskAI-MiniAPP-React.git
cd TaskAI-MiniAPP-React

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npx expo start
```

Escanea el código QR con la app **Expo Go** en tu teléfono.

## Estructura del proyecto

```
app/
  _layout.tsx         — Layout raíz con verificación de auth
  index.tsx           — Redirección inicial
  (auth)/
    login.tsx         — Pantalla de login / registro
  (tabs)/
    _layout.tsx       — Navegación por tabs
    index.tsx         — Lista de tareas en tiempo real
    create.tsx        — Formulario para crear tareas
services/
  firebase.ts         — Inicialización de Firebase
  taskService.ts      — CRUD de tareas con Firestore
types/
  task.ts             — Tipos TypeScript compartidos
components/
  TaskCard.tsx        — Tarjeta de tarea individual
```

## Funcionalidades

- **Autenticación**: Login y registro con email/contraseña vía Firebase Auth
- **Lista de tareas**: Sincronización en tiempo real con Firestore, pull-to-refresh
- **Crear tarea**: Título, descripción, categoría (trabajo/personal/estudio/urgente) y prioridad (alta/media/baja)
- **Completar tarea**: Toggle de estado con efecto visual (tachado)
- **Compatibilidad Flutter**: Usa la misma colección `users/{userId}/tasks` que la app Flutter

## Estructura Firestore

```
users/
  {userId}/
    tasks/
      {taskId}/
        title: string
        description: string
        category: 'trabajo' | 'personal' | 'estudio' | 'urgente'
        priority: 'alta' | 'media' | 'baja'
        isCompleted: boolean
        userId: string
        createdAt: Timestamp
        dueDate?: Timestamp
```

## Scripts disponibles

```bash
npm run start      # Expo DevTools (escanear QR con Expo Go)
npm run android    # Abrir en emulador Android
npm run ios        # Abrir en simulador iOS (solo macOS)
npm run web        # Abrir en navegador
```

## Relación con la app Flutter

Esta mini-app comparte el mismo proyecto Firebase (`taskai-app-5f0b1`) que la app Flutter original. Los datos creados en una app son visibles inmediatamente en la otra gracias a la sincronización en tiempo real de Firestore.
