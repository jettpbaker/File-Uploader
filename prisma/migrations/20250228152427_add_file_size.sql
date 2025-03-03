-- First add the column as nullable
ALTER TABLE "File" ADD COLUMN "size" BIGINT;

-- Update existing records with a default size (0 in this case)
UPDATE "File" SET "size" = 0 WHERE "size" IS NULL;

-- Make the column required
ALTER TABLE "File" ALTER COLUMN "size" SET NOT NULL; 