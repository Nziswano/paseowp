#!/bin/zsh
# https://stackoverflow.com/questions/12651355/zsh-read-lines-from-file-into-array
# https://stackoverflow.com/questions/2930238/split-string-with-zsh-as-in-python
# https://stackoverflow.com/questions/9347878/capturing-and-testing-output-command-in-zsh
echo "We are in"

for LINE in "${(@f)"$(<$1)"}"
{
    # echo $LINE
    a=("${(@s/=/)LINE}")
    KEY=${a[1]}
    VALUE=${a[2]}
    echo "Key: ${KEY} - Value: ${VALUE}"
    local result=$(aws ssm put-parameter --name $KEY --type "String" --value $VALUE --overwrite 2>/dev/null) 
}
