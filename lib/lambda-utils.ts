import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as fs from 'fs';

export function createLambdaCode(sourceDir: string, includeFiles: string[]): lambda.Code {
  const allFiles = fs.readdirSync(sourceDir);
  const excludeFiles = allFiles.filter(file => !includeFiles.includes(file));
  
  return lambda.Code.fromAsset(sourceDir, {
    exclude: excludeFiles,
  });
}