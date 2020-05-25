#!/bin/zsh
echo "We are in"
for LINE in "${(@f)"$(<./.env)"}"
{
    # echo $LINE
    a=("${(@s/=/)LINE}")
    KEY=${a[1]}
    VALUE=${a[2]}
    echo "Key: ${KEY} - Value: ${VALUE}"
    aws ssm put-parameter --name $KEY --type "String" --value $VALUE
}
