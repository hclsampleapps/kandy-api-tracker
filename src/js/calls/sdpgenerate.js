// @file sdpgenerate.js
class SdpGenerate {
    constructor() {
        window.IceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.RTCIceCandidate;
        window.RTCPeerConnection = webkitRTCPeerConnection || mozRTCPeerConnection;
        var pc_config = {
            "iceServers": [{
                "url": "stun:stun1.l.google.com:19302"
            }]
        };
        this.pc = "";
        this.streamReference = null;
    }
    startStream() {
        navigator.getUserMedia({
                audio: true,
                video: true
            },
            (stream) => this.dumpOffer(stream),
            (err) => this.errorCallback(err)
        );
    }
    stopStream() {
        console.log("SdpGenerate, stopStream");
        if (!this.streamReference) return;
        this.streamReference.getAudioTracks().forEach(function(track) {
            track.stop();
        });
        this.streamReference.getVideoTracks().forEach(function(track) {
            track.stop();
        });
        this.streamReference = null;
    }
    dumpOffer(stream) {
        console.log("SdpGenerate, dumpOffer, stream", stream);
        this.streamReference = stream;
        this.pc.addStream(stream);
        this.pc.createOffer((offer) => this.rtpOffer(offer), (err) => this.errorCallback(err));
    };
    rtpOffer(offer) {
        this.pc.setLocalDescription(offer);
        console.log("SdpGenerate, rtpOffer, sdp", offer.sdp);
        this.sdpData = offer.sdp;
    }
    errorCallback(e) {
        if (e.code == 1) {
            alert('User denied access to their camera');
        } else {
            alert('getUserMedia() not supported in your browser.');
        }
    }
    set sdpData(sdp) {
        this.sdpValue = sdp;
    }
    get sdpData() {
        return this.sdpValue;
    }
    initialize() {
        try {
            this.pc = new RTCPeerConnection(this.pc_config);
            console.log("SdpGenerate, initialize, pc", this.pc);
            this.pc.onicecandidate = function(evt) {
                if (evt.candidate) {
                    console.log('SdpGenerate, ICE candidate:', evt.candidate);
                } else {
                    console.log("SdpGenerate, End of candidates.");
                    if (this.pc != null) {
                        var sdp = pc.localDescription;
                        console.log("SdpGenerate, initialize, sdp", sdp);
                    }
                }
            };
        } catch (e) {
            console.log("SdpGenerate, initialize, Failed to create PeerConnection, exception", e.message);
        }
    }
}