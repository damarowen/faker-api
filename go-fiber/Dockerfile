
FROM golang:1.19-alpine3.15 AS builder

ENV GO111MODULE=on 

WORKDIR /go/src/github.com/damarowen/faker-api/go-fiber

COPY . .

#dependencies
RUN go mod tidy 

WORKDIR /go/src/github.com/damarowen/faker-api/go-fiber/cmd/faker-api
 
#RUN GOOS=linux go build -a -installsuffix cgo -o app .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .


#Second stage for a smaller image
FROM alpine:3.15
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/github.com/damarowen/faker-api/go-fiber/cmd/faker-api/app .
COPY --from=builder /go/src/github.com/damarowen/faker-api/go-fiber/.env .       

CMD ["./app"]



# FROM golang:1.15 as builder
# COPY . /go/src/gitlab.com/fdnetworks/api/newsso

# WORKDIR /go/src/gitlab.com/fdnetworks/api/newsso
# RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# FROM alpine:3.9
# RUN apk --no-cache add ca-certificates

# WORKDIR /root/
# COPY --from=builder /go/src/gitlab.com/fdnetworks/api/newsso/ .

# EXPOSE 8080
# CMD ["./app"]
