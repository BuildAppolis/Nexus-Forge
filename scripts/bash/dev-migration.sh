#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_message() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

# Function to run a command and check its exit status
run_command() {
    command=$1
    message=$2
    
    print_message $YELLOW "Running: $message..."
    if $command; then
        print_message $GREEN "✓ $message completed successfully."
    else
        print_message $RED "✗ $message failed. Exiting."
        exit 1
    fi
}

# Main script execution
print_message $GREEN "Starting development migration process..."

# Step 1: Generate Prisma client
run_command "pnpm prisma generate" "Generating Prisma client"

# Step 2: Create a new migration
read -p "Enter a name for the new migration: " migration_name
run_command "pnpm prisma migrate dev --name $migration_name" "Creating new migration: $migration_name"

# Step 3: Apply migrations
run_command "pnpm prisma migrate deploy" "Applying migrations to the database"

# Step 4: Push schema changes
run_command "pnpm prisma db push" "Pushing schema changes to the database"

# Step 5: Validate the database schema
run_command "pnpm prisma validate" "Validating the database schema"

# Step 6: Restart Prisma Studio
print_message $YELLOW "Restarting Prisma Studio..."
pkill -f "prisma studio" || true
pnpm prisma studio &

print_message $GREEN "Development migration process completed successfully!"
print_message $YELLOW "Prisma Studio has been restarted. You can access it at http://localhost:5555"
print_message $YELLOW "Remember to refresh your browser if Prisma Studio was already open."