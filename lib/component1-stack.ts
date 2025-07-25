import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import { LayerStack } from './layer-stack';

export class Component1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = lambda.LayerVersion.fromLayerVersionArn(this, 'MyLayer',
      ssm.StringParameter.valueForStringParameter(this, LayerStack.LAYER_ARN_PARAMETER_NAME));

    const myFunction = new lambda.Function(this, 'Function1', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('src/lambda1'),
      layers: [
        layer,
      ]
    });

    const alias = new lambda.Alias(this, 'MyFunctionAlias', {
      aliasName: 'live',
      version: myFunction.currentVersion,
    });

    const alarm = new cloudwatch.Alarm(this, 'Errors', {
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      threshold: 0,
      evaluationPeriods: 1,
      metric: alias.metricErrors(),
    });

    new codedeploy.LambdaDeploymentGroup(this, 'MyFunctionDeploymentGroup', {
      alias,
      deploymentConfig: codedeploy.LambdaDeploymentConfig.CANARY_10PERCENT_5MINUTES,
      alarms: [
        alarm,
      ],
    });

  }
}
