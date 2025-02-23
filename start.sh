#!/bin/bash

# Store the root directory
ROOT_DIR=$(pwd)

# Create logs directory if it doesn't exist
mkdir -p "$ROOT_DIR/logs"

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Function to check if any required ports are in use
check_required_ports() {
    local ports=(9000 9001 9002 9003)
    local ports_in_use=()
    
    echo "Checking port availability..."
    for port in "${ports[@]}"; do
        if check_port "$port"; then
            ports_in_use+=($port)
        fi
    done
    
    if [ ${#ports_in_use[@]} -ne 0 ]; then
        echo "❌ Error: The following ports are already in use:"
        for port in "${ports_in_use[@]}"; do
            echo "   - Port $port is in use by process: $(lsof -ti:$port)"
        done
        echo ""
        echo "Please ensure these ports are free before starting the application."
        exit 1
    fi
    
    echo "✅ All required ports are available"
}

# Function to build an app
build_app() {
    local app_name=$1
    local app_dir=$2
    
    echo "Building $app_name..."
    cd "$app_dir"

    # Clean up previous build
    rm -rf dist/

    # Install dependencies
    echo "Installing dependencies for $app_name..."
    pnpm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies for $app_name"
        exit 1
    fi

    # Run TypeScript build first
    echo "Running TypeScript build for $app_name..."
    pnpm exec tsc --noEmit
    if [ $? -ne 0 ]; then
        echo "❌ TypeScript errors found in $app_name"
        exit 1
    fi

    # Run the actual build
    echo "Building $app_name..."
    pnpm run build
    if [ $? -ne 0 ]; then
        echo "❌ Failed to build $app_name"
        exit 1
    fi
    echo "✅ Built $app_name successfully"
}

# Function to wait for port to be ready
wait_for_port() {
    local port=$1
    local app_name=$2
    local timeout=30
    local count=0
    
    echo "Waiting for $app_name to be ready on port $port..."
    while ! check_port $port; do
        if [ $count -ge $timeout ]; then
            echo "❌ Timeout waiting for $app_name on port $port"
            echo "Please check the logs at $ROOT_DIR/logs/$app_name.log"
            exit 1
        fi
        sleep 1
        ((count++))
    done
    echo "✅ $app_name is ready on port $port!"
}

# Function to start an app
start_app() {
    local app_name=$1
    local port=$2
    local app_dir=$3
    
    echo "Starting $app_name..."
    cd "$app_dir"
    nohup pnpm run preview > "$ROOT_DIR/logs/$app_name.log" 2>&1 &
    local PID=$!
    
    # Store PID in variable named after the app
    eval "${app_name}_PID=$PID"
    
    # Wait for port to be ready
    wait_for_port $port "$app_name"
}

# Clean up function
cleanup() {
    echo "Stopping applications..."
    if [ -n "$CATALOG_PID" ]; then kill $CATALOG_PID 2>/dev/null; fi
    if [ -n "$CART_PID" ]; then kill $CART_PID 2>/dev/null; fi
    if [ -n "$PROFILE_PID" ]; then kill $PROFILE_PID 2>/dev/null; fi
    if [ -n "$HOST_PID" ]; then kill $HOST_PID 2>/dev/null; fi
    exit 0
}

# First check if all required ports are available
check_required_ports

# Clear previous logs
rm -f "$ROOT_DIR/logs"/*.log

# Build all applications
echo "🚀 Building applications..."
build_app "catalog" "$ROOT_DIR/apps/catalog"
build_app "cart" "$ROOT_DIR/apps/cart"
build_app "user-profile" "$ROOT_DIR/apps/user-profile"
build_app "host" "$ROOT_DIR/host-app"

# Start all applications
echo "Starting applications..."
start_app "catalog" 9001 "$ROOT_DIR/apps/catalog"
start_app "cart" 9002 "$ROOT_DIR/apps/cart"
start_app "profile" 9003 "$ROOT_DIR/apps/user-profile"
start_app "host" 9000 "$ROOT_DIR/host-app"

echo ""
echo "🚀 All applications are running!"
echo "📱 Host app: http://localhost:9000"
echo "📦 Catalog app: http://localhost:9001"
echo "🛒 Cart app: http://localhost:9002"
echo "👤 User Profile app: http://localhost:9003"
echo ""
echo "📝 Logs are available in the logs directory:"
echo "   - $ROOT_DIR/logs/catalog.log"
echo "   - $ROOT_DIR/logs/cart.log"
echo "   - $ROOT_DIR/logs/profile.log"
echo "   - $ROOT_DIR/logs/host.log"
echo ""
echo "Press Ctrl+C to stop all applications"

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Keep the script running
wait 
