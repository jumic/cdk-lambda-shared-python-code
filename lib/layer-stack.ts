import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class LayerStack extends cdk.Stack {
  layer: lambda.LayerVersion;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.layer = new lambda.LayerVersion(this, 'SharedLayer', {
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_13],
      code: lambda.Code.fromAsset('src/layer'),
    });

  }
}
