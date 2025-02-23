# Neural Architecture Search with Feature Models 

## Prerequisite
### Python
The code should be run using python 3.5, Tensorflow 1.12.0, Keras 2.2.4, PIL, Validators

### Tensorflow
```bash
sudo pip install tensorflow
```
if you have gpu,
```bash
pip install tensorflow-gpu
```

### Keras
Keras is included in the requirements. Install all the requirements of the file

To set Keras backend to be tensorflow (two options):
```bash
1. Modify ~/.keras/keras.json by setting "backend": "tensorflow"
2. KERAS_BACKEND=tensorflow python gen_diff.py
```


## First run
run the example 
```bash
conda activate tf
source env/bin/activate
pip install -r requirements.txt
python ./full.py
```

It will load the base product of a feature model (for instance lenet5.json)
This file is generated with Feature model product parser.


## Building a .json product
Use the script featuremode_to_json.py to convert a product generated by PLEDGE (https://github.com/christopherhenard/pledge) into a json that can be parsed by the generator 


