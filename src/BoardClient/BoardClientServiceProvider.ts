import ServiceProvider from "../ServiceProvider";
import BoardClientInterface, {BoardClient} from "./BoardClientInterface";
import SyncBoardClient from "./SyncBoardClient";
import {Board} from "../Board/Board";

export default class BoardClientServiceProvider extends ServiceProvider {

    /**
     *
     */
    public register(): void {
        this.container.bind(BoardClient).toDynamicValue((): BoardClientInterface => {
            return new SyncBoardClient(new Board(10));
        });
    }
}
