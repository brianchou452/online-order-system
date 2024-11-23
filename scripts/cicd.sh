#!/bin/bash -ex

CMD=${1}

BUILD_IMG_NAME=ghcr.io/brianchou452/online-order-system

if [ "$CMD" == "TO_GITHUB" -a "$#" == "3" ]; then
    BUILD_VERSION=${2}
    BUILD_ENV=${3}
    TAG=$BUILD_IMG_NAME:$BUILD_VERSION

    if [ "$BUILD_ENV" == "test" ]; then
        TAG=$TAG-test
    elif [ "$BUILD_ENV" == "stage" ]; then
        TAG=$TAG-stage
        GENERATE_SOURCEMAP=false
    else
        BUILD_ENV="production"
        GENERATE_SOURCEMAP=false
    fi

    echo "Run Build(BUILD_VERSION=$BUILD_VERSION)"
    docker buildx build --pull\
                    --build-arg BUILD_VERSION=$BUILD_VERSION\
                    --build-arg BUILD_ENV=$BUILD_ENV\
                    --platform=linux/amd64,linux/arm64\
                    --push\
                    -t $TAG\
                    .
else
    echo "Invalid command"
    exit 1
fi