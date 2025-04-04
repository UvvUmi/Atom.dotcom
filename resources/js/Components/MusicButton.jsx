export default function MusicButton() {
    
    
    return (
        <audio autoPlay>
            <source src="{{ asset('public/audio/main.mp3') }}" type="audio/mp3"/>
            <source src="{{ asset('public/audio/main.ogg') }}" type="audio/ogg"/>
        </audio>
    );
}