#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { Component1Stack } from '../lib/component1-stack';
import { Component2Stack } from '../lib/component2-stack';
import { LayerStack } from '../lib/layer-stack';


const app = new cdk.App();
const layerStack = new LayerStack(app, 'LayerStack')

new Component1Stack(app, 'Componenet1Stack', {
  layer: layerStack.layer,
});

new Component2Stack(app, 'Componenet2Stack', {
  layer: layerStack.layer,
});