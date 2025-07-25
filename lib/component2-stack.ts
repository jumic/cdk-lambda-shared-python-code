import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { LayerStack } from './layer-stack';

export class Component2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = lambda.LayerVersion.fromLayerVersionArn(this, 'MyLayer',
      ssm.StringParameter.valueForStringParameter(this, LayerStack.LAYER_ARN_PARAMETER_NAME));

    new lambda.Function(this, 'Function2', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('src/lambda1'),
      layers: [
        layer,
      ]
    });

  }
}
