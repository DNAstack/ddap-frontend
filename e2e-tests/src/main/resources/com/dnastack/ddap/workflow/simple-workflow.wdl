version 1.0

task hello {

input {
String name
}

command {
echo 'hello ${name}!'
}
output {
String response = read_string(stdout())
}

runtime {
docker: "ubuntu:latest"
cpu: 1
memory: "3.75 GB"
}
}

workflow test {

input {
String name
}

call hello {
input:
name = name
}

output {
String response = hello.response
}
}