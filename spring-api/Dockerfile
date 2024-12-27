# ------------------------------------------------------------
# Base image with Flutter + Java + Maven
# ------------------------------------------------------------
FROM ubuntu:20.04

# Avoid user prompts during package installations
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies for Flutter, Java, and Maven
RUN apt-get update && \
    apt-get install -y \
    curl \
    git \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    openjdk-17-jdk \
    maven \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# ------------------------------------------------------------
# Install Flutter
# ------------------------------------------------------------
ARG FLUTTER_VERSION=3.13.4
RUN curl -fSL https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_${FLUTTER_VERSION}-stable.tar.xz -o flutter_linux.tar.xz && \
    tar -xf flutter_linux.tar.xz -C /opt && \
    rm flutter_linux.tar.xz && \
    ln -s /opt/flutter /flutter

# Add Flutter to PATH
ENV PATH="/flutter/bin:$PATH"

# (Optional) Pre-cache Flutter to avoid extra downloads
RUN flutter doctor -v

# ------------------------------------------------------------
# Build and run the Spring Boot application
# ------------------------------------------------------------
WORKDIR /app

# Copy in your Maven project files
COPY pom.xml .
COPY src ./src

# Build your Spring Boot JAR (skip tests for speed, optional)
RUN mvn clean package -DskipTests

# Expose the port your Spring Boot app listens on
EXPOSE 8080

# Run the Spring Boot JAR
# Adjust 'app.jar' if your artifact has a different name
ENTRYPOINT ["java", "-jar", "/app/target/app.jar"]
