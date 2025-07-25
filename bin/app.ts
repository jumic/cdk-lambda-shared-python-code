#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { Component1Stack } from '../lib/component1-stack';
import { Component2Stack } from '../lib/component2-stack';
import { LayerStack } from '../lib/layer-stack';


const app = new cdk.App();
const layerStack = new LayerStack(app, 'LayerStack')

const componenet1Stack = new Component1Stack(app, 'Componenet1Stack');

const componenet2Stack = new Component2Stack(app, 'Componenet2Stack');

componenet1Stack.addDependency(layerStack);
componenet2Stack.addDependency(layerStack);
