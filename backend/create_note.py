import boto3
import json
from datetime import datetime
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('notes')

def lambda_handler(event, context):
    body = json.loads(event["body"])

    title = body.get("title", "")
    content = body.get("content", "")

    note_item = {
        "noteId": str(uuid.uuid4()),
        "title": title,
        "content": content,
        "createdAt": datetime.utcnow().isoformat()
    }

    table.put_item(Item=note_item)

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "message": "Note created successfully",
            "note": note_item
        })
    }
