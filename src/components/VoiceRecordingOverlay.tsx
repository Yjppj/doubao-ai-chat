import { useEffect, useState } from 'react';

interface VoiceRecordingOverlayProps {
  isRecording: boolean;
  onCancel: () => void;
}

export const VoiceRecordingOverlay = ({ isRecording, onCancel }: VoiceRecordingOverlayProps) => {
  const [waveformLevels, setWaveformLevels] = useState<number[]>([]);

  // Generate random waveform levels for animation
  useEffect(() => {
    if (!isRecording) return;

    const generateWaveform = () => {
      const levels: number[] = [];
      const totalDots = 60;
      for (let i = 0; i < totalDots; i++) {
        // Create a wave pattern with some randomness
        const baseLevel = Math.sin(i * 0.2) * 0.3 + 0.5;
        const randomness = Math.random() * 0.4;
        levels.push(Math.min(1, Math.max(0.1, baseLevel + randomness)));
      }
      setWaveformLevels(levels);
    };

    generateWaveform();
    const interval = setInterval(generateWaveform, 150);

    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isRecording) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col">
      {/* Main content area - shows through with gradient overlay */}
      <div className="flex-1 relative">
        {/* Gradient overlay from top */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(147,197,253,0.3) 50%, rgba(96,165,250,0.6) 100%)',
          }}
        />
      </div>

      {/* Bottom recording UI */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(to bottom, rgba(96,165,250,0.6) 0%, rgba(59,130,246,0.85) 30%, rgba(37,99,235,0.95) 100%)',
        }}
      >
        {/* Hint text */}
        <div className="text-center py-6">
          <p className="text-white/80 text-[15px] tracking-wide">
            松手发送，上移取消
          </p>
        </div>

        {/* Waveform visualization */}
        <div className="flex items-center justify-center gap-[3px] px-8 pb-10 h-16">
          {waveformLevels.map((level, index) => {
            const key = `wave-${index}`;
            return (
              <div
                key={key}
                className="w-[4px] rounded-full transition-all duration-150 ease-out"
                style={{
                  height: `${Math.max(4, level * 32)}px`,
                  backgroundColor: `rgba(255, 255, 255, ${0.4 + level * 0.5})`,
                }}
              />
            );
          })}
        </div>

        {/* Safe area padding */}
        <div className="h-8" />
      </div>
    </div>
  );
};
