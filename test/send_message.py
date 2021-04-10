import boto3
import uuid
from datetime import datetime
import sys

client = boto3.client('s3')
sts = boto3.client('sts')

caller_identity = sts.get_caller_identity()
account = caller_identity['Account']

sqs = boto3.resource('sqs')

def main(args):
    
    QUEUE_NAME = args[1]
    print(QUEUE_NAME)

    QUEUE_URL = 'https://sqs.ap-northeast-1.amazonaws.com/{}/{}'.format(account, QUEUE_NAME)
    queue = sqs.Queue(QUEUE_URL)

    count = 1
    cursor = 0
    group = ('a','b','c','d','e')
    
    sendgroup = datetime.now().strftime('%Y%m%d%H%M%S')
    
    while True:

        qid = str(uuid.uuid1())
        
        message_body='queue:{}:sendgroup:{}:group:{} - {}'.format(QUEUE_NAME, sendgroup, group[cursor], str(count))
        
        response = queue.send_message(
                        MessageBody=message_body,
                        MessageGroupId=group[cursor],
                        MessageDeduplicationId=qid)
        print(response)
        
        count += 1
        
        cursor += 1
        if cursor == len(group):
            cursor = 0

        if 300 < count:
            break

    print(sendgroup)

if __name__ == "__main__":
    main(sys.argv)
