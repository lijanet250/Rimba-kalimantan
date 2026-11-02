/**
 * Web Audio API synthesizer for natural tropical rainforest ambient soundscapes
 * and wildfire embers without requiring external audio files.
 */

class SoundscapeManager {
  private ctx: AudioContext | null = null;
  private isRainforestPlaying = false;
  private isWildfirePlaying = false;
  private gainNode: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private rainInterval: number | null = null;
  private birdInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play gentle tropical rainforest ambiance (insects, gentle breeze, distant birds)
  startRainforest(volume = 0.3) {
    this.stopAll();
    this.initContext();
    if (!this.ctx) return;

    this.isRainforestPlaying = true;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    // 1. Pink noise generator for gentle rainforest foliage breeze
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.035;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to soft rustling frequencies (600Hz - 2500Hz)
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1200;
    bandpass.Q.value = 1.2;

    whiteNoise.connect(bandpass);
    bandpass.connect(this.gainNode);
    whiteNoise.start();
    this.activeNodes.push(whiteNoise);

    // 2. High-frequency cicadas / tropical night insects oscillator
    const cicadaOsc = this.ctx.createOscillator();
    const cicadaGain = this.ctx.createGain();
    cicadaOsc.type = 'sine';
    cicadaOsc.frequency.value = 4400; // high cricket timbre

    // LFO to modulate insect pulsing
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 7.5; // pulses per sec
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.04;

    lfo.connect(cicadaGain.gain);
    cicadaOsc.connect(cicadaGain);
    cicadaGain.connect(this.gainNode);

    cicadaOsc.start();
    lfo.start();
    this.activeNodes.push(cicadaOsc, lfo);

    // 3. Occasional tropical bird calls every few seconds
    this.birdInterval = window.setInterval(() => {
      if (!this.ctx || !this.isRainforestPlaying || !this.gainNode) return;
      this.playBirdChirp();
    }, 4500);
  }

  private playBirdChirp() {
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const chirpGain = this.ctx.createGain();

    osc.type = 'sine';
    const baseFreq = 2200 + Math.random() * 800;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, now + 0.28);

    chirpGain.gain.setValueAtTime(0.001, now);
    chirpGain.gain.linearRampToValueAtTime(0.08, now + 0.05);
    chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(chirpGain);
    chirpGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // Play crackling wildfire embers & low wind rumble
  startWildfire(volume = 0.35) {
    this.stopAll();
    this.initContext();
    if (!this.ctx) return;

    this.isWildfirePlaying = true;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    // 1. Low rumbling fire inferno (brown noise / filtered lowpass)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 0.35;
    }

    const rumbleSource = this.ctx.createBufferSource();
    rumbleSource.buffer = noiseBuffer;
    rumbleSource.loop = true;

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 180;

    rumbleSource.connect(lowpass);
    lowpass.connect(this.gainNode);
    rumbleSource.start();
    this.activeNodes.push(rumbleSource);

    // 2. High-frequency sporadic ember crackling
    this.rainInterval = window.setInterval(() => {
      if (!this.ctx || !this.isWildfirePlaying || !this.gainNode) return;
      if (Math.random() > 0.35) {
        this.playEmberCrack();
      }
    }, 120);
  }

  private playEmberCrack() {
    if (!this.ctx || !this.gainNode) return;
    const now = this.ctx.currentTime;
    const buffer = this.ctx.createBuffer(1, 1200, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < 1200; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 150);
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2400 + Math.random() * 2000;

    const crackGain = this.ctx.createGain();
    crackGain.gain.setValueAtTime(0.04 + Math.random() * 0.06, now);
    crackGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    source.connect(filter);
    filter.connect(crackGain);
    crackGain.connect(this.gainNode);

    source.start(now);
    source.stop(now + 0.09);
  }

  setVolume(val: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  stopAll() {
    this.isRainforestPlaying = false;
    this.isWildfirePlaying = false;

    if (this.birdInterval) {
      clearInterval(this.birdInterval);
      this.birdInterval = null;
    }
    if (this.rainInterval) {
      clearInterval(this.rainInterval);
      this.rainInterval = null;
    }

    this.activeNodes.forEach(node => {
      if (typeof node === 'object' && 'stop' in node) {
        try {
          (node as AudioScheduledSourceNode).stop();
        } catch {
          // ignore already stopped
        }
      }
    });
    this.activeNodes = [];
  }

  // Synthesize realistic animal vocalizations for interactive cards
  playAnimalSound(type: 'orangutan' | 'enggang' | 'bekantan' | 'frog') {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    if (type === 'orangutan') {
      // Orangutan long call (deep resonant booming rumble that rises and settles)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);
      filter.frequency.exponentialRampToValueAtTime(520, now + 0.4);
      filter.frequency.exponentialRampToValueAtTime(240, now + 1.2);

      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(145, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(85, now + 1.2);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } else if (type === 'enggang') {
      // Hornbill deep resonant honking flight call
      for (let i = 0; i < 2; i++) {
        const honkTime = now + i * 0.28;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        filter.type = 'bandpass';
        filter.frequency.value = 880;
        filter.Q.value = 4.0;

        osc.frequency.setValueAtTime(420, honkTime);
        osc.frequency.exponentialRampToValueAtTime(580, honkTime + 0.08);
        osc.frequency.exponentialRampToValueAtTime(360, honkTime + 0.22);

        gain.gain.setValueAtTime(0.001, honkTime);
        gain.gain.linearRampToValueAtTime(0.2, honkTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, honkTime + 0.24);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(honkTime);
        osc.stop(honkTime + 0.25);
      }
    } else if (type === 'bekantan') {
      // Bekantan rapid warning honk / nasal squawk
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.09);
      osc.frequency.exponentialRampToValueAtTime(310, now + 0.28);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 650;
      filter.Q.value = 3.5;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } else if (type === 'frog') {
      // Wallace flying frog croak
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(260, now + 0.07);
      osc.frequency.linearRampToValueAtTime(140, now + 0.16);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  }

  // Subtle UI tap feedback
  playTapSound() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  getState() {
    return {
      isRainforestPlaying: this.isRainforestPlaying,
      isWildfirePlaying: this.isWildfirePlaying,
    };
  }
}

export const soundscape = new SoundscapeManager();
