
To send messages, do this at the root directory of this repository.

```
python -m venv test/env
source test/env/bin/activate
pip3 install -r test/requirements.txt
python test/send_message.py cdksqslambdafifo.fifo
python test/send_message.py cdksqslambdafifobatch.fifo
python test/send_message.py cdksqslambdafifoconc.fifo
python test/send_message.py cdksqslambdafifomixed.fifo
```

Count consumed and rejected messages in CloudWatch Logs Insight.

```
filter @message like /action:[a-z]+:queue:[a-z0-9]+:sendgroup:[-0-9T:]+ - /
| parse @message "action:*:queue:*:sendgroup:* - " as action, queue, sendgroup
| stats count(*) as cnt by queue, action, sendgroup
| display cnt, queue, action, sendgroup
| sort sendgroup desc
```

Show specific batch processing duration in CloudWatch Logs Insight.

```
filter @message like /action:consumed:queue:[a-z0-9]+:sendgroup:20210404130632/
| (latest(@timestamp) - earliest(@timestamp)) / 1000 as duration
| display duration
```