#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { Component1Stack } from '../lib/component1-stack';
import { Component2Stack } from '../lib/component2-stack';


const app = new cdk.App();

new Component1Stack(app, 'Componenet1Stack');

new Component2Stack(app, 'Componenet2Stack');
