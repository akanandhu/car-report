-- CreateTable
CREATE TABLE "indian_states" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "indian_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rtos" (
    "id" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "rtos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "indian_states_code_key" ON "indian_states"("code");

-- CreateIndex
CREATE UNIQUE INDEX "rtos_code_key" ON "rtos"("code");

-- CreateIndex
CREATE INDEX "rtos_state_id_idx" ON "rtos"("state_id");

-- AddForeignKey
ALTER TABLE "rtos" ADD CONSTRAINT "rtos_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "indian_states"("id") ON DELETE CASCADE ON UPDATE CASCADE;
