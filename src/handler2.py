import json
import shared

def lambda_handler(event, context):

    result = shared.add_numbers(10, 100)
    
    return {
        "statusCode": 200,
        "body": json.dumps(f"Result of adding 10 and 100: {result}")
    }
