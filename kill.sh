#!/bin/bash

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Function to kill process on a specific port
kill_port() {
    local port=$1
    local name=$2
    
    # Get all PIDs for the port (there might be multiple)
    local pids=($(lsof -ti:$port))
    
    if [ ${#pids[@]} -gt 0 ]; then
        echo "Found ${#pids[@]} process(es) for $name on port $port"
        for pid in "${pids[@]}"; do
            echo "Killing process (PID: $pid)..."
            kill -9 $pid 2>/dev/null
        done
        
        # Double check if port is truly free
        sleep 1
        if check_port $port; then
            echo "❌ Warning: Port $port is still in use. Trying one more time..."
            pids=($(lsof -ti:$port))
            for pid in "${pids[@]}"; do
                kill -9 $pid 2>/dev/null
            done
        fi
        
        if ! check_port $port; then
            echo "✅ Stopped all processes for $name"
        else
            echo "❌ Failed to free port $port. Please check manually."
        fi
    else
        echo "ℹ️  No process found on port $port ($name)"
    fi
}

echo "🔍 Checking for running microfrontend processes..."

# Kill all microfrontend processes
kill_port 9000 "Host app"
kill_port 9001 "Catalog app"
kill_port 9002 "Cart app"
kill_port 9003 "User Profile app"

# Final verification
echo ""
echo "🔍 Verifying all ports are free..."
all_clear=true

for port in 9000 9001 9002 9003; do
    if check_port $port; then
        echo "❌ Port $port is still in use!"
        all_clear=false
    fi
done

if $all_clear; then
    echo "✅ All ports are free and ready to use"
else
    echo "❌ Some ports are still in use. You may need to handle these manually:"
    echo "   You can try: 'lsof -ti:9000,9001,9002,9003' to see the processes"
fi

echo "✨ Done" 
