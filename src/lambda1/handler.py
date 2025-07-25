import json
import shared

def lambda_handler(event, context):
    if event.get("error"):
        raise ValueError("Simulate an error.")
    
    result = shared.add_numbers(5, 7)
    
    return {
        "statusCode": 201,
        "body": json.dumps(f"Result of adding 5 and 7: {result}")
    }
