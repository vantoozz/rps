import {Container} from 'inversify';

export default abstract class ServiceProvider {
    protected container: Container;

    public constructor(container: Container) {
        this.container = container;
    }

    public abstract register(): void;
}
