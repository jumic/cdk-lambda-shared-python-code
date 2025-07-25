import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

interface StackProps extends cdk.StackProps {
  layer: lambda.LayerVersion;
}

export class Component2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'Function2', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('src/lambda1'),
      layers: [
        props.layer,
      ]
    });

  }
}
