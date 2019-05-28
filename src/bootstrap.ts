import ServiceProvider from "./ServiceProvider";
import {Container} from 'inversify';
import BoardClientServiceProvider from "./BoardClient/BoardClientServiceProvider";

const container = new Container;

const serviceProviders = [
    BoardClientServiceProvider,
];

for (const serviceProvider of serviceProviders) {
    ((new serviceProvider(container)) as ServiceProvider).register();
}

export {container};
