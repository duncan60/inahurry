import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

class UtilsStore extends EventEmitter {
    emitChange(type) {
        setTimeout(() => {
            this.emit(CHANGE_EVENT, type);
        }, 0);
    }
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

export default UtilsStore;
