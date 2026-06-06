# Database Schema & SQL

## 1. Prisma Models
Defined in `prisma/schema.prisma`.

### Project
```prisma
model Project {
  id           String      @id @default(uuid())
  name         String
  description  String?
  techStack    Json        // ["Flutter", "Dart", "Supabase"]
  architecture String
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
  tasks        Task[]
  blueprints   Blueprint[]
}
```

### Task
```prisma
model Task {
  id          String    @id @default(uuid())
  projectId   String
  title       String
  status      String    // "TODO", "IN_PROGRESS", "DONE"
  commitMsg   String?
  completedAt DateTime?
  project     Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
}
```

### Blueprint
```prisma
model Blueprint {
  id         String   @id @default(uuid())
  projectId  String
  schemaJson Json
  aiRules    String[]
  project    Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}
```

## 2. SQL Initialization (Supabase)
```sql
-- Enable RLS on all tables
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Task" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Blueprint" ENABLE ROW LEVEL SECURITY;

-- Default policies (authenticated access)
CREATE POLICY "Allow public read access" ON "Project" FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON "Task" FOR SELECT USING (true);
```
