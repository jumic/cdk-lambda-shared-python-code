import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { createLambdaCode } from './lambda-utils';

export class Component1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'Function1', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'handler1.lambda_handler',
      code: createLambdaCode('src', ['handler1.py', 'shared.py']),
    });

  }
}
