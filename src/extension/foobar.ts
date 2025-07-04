import needle from 'needle';
import type { NeedleResponse } from 'needle';
import { get as nodecg } from './util/nodecg';
import type NodeCG from 'nodecg/types';

class FoobarControl {
  address: string;
  log: NodeCG.Logger;

  constructor(address: string) {
    this.address = address;
    this.log = new (nodecg() as unknown as NodeCG.ServerAPI).Logger('foobar');
  }

  togglePause() {
    needle('post', `${this.address}/api/player/pause/toggle`, {}).catch(
      (error: { message: string }) => {
        this.log.error('Błąd przy (od)pauzowaniu foobara: ' + error.message);
      }
    );
  }

  mute() {
    needle('post', `${this.address}/api/player?isMuted=true`, {}).catch(
      (error: { message: string }) => {
        this.log.error('Błąd przy wyciszaniu foobara: ' + error.message);
      }
    );
  }

  unmute() {
    needle('post', `${this.address}/api/player?isMuted=false`, {}).catch(
      (error: { message: string }) => {
        this.log.error('Błąd przy odciszaniu foobara: ' + error.message);
      }
    );
  }

  /** Sets the foobar volume in dB. Use the foobar2000 UI for reference on what values to use.
   * @param volume - The volume in dB. 0 is full volume.
   */
  setVolume(volume: number) {
    needle('post', `${this.address}/api/player?volume=${volume}`, {}).catch(
      (error: { message: string }) => {
        this.log.error('Błąd przy ustawianiu głośności: ' + error.message);
      }
    );
  }

  async getSong(): Promise<string> {
    try {
      const playerInfo: NeedleResponse = await needle(
        'get',
        `${this.address}/api/player?columns=${encodeURIComponent('%artist%,%title%')}`
      );
      if (
        playerInfo.body.player.activeItem.columns[0] &&
        playerInfo.body.player.activeItem.columns[1]
      ) {
        return `${playerInfo.body.player.activeItem.columns[0]} - ${playerInfo.body.player.activeItem.columns[1]}`;
      } else {
        return 'Brak piosenki';
      }
    } catch (error: any) {
      this.log.error('Błąd otrzymywania piosenki: ' + error.message);
      return 'Brak piosenki';
    }
  }
}

export default FoobarControl;
