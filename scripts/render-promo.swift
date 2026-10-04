// Original GanJiang promotional motion design. Run on macOS with system media access:
// swift -module-cache-path /tmp/ganjiang-swift-cache scripts/render-promo.swift
import Foundation
import AVFoundation
import CoreGraphics
import CoreText
import ImageIO
import UniformTypeIdentifiers

let W = 1920, H = 1080, fps: Int32 = 30, seconds = 12.0
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let assets = root.appendingPathComponent("assets/video", isDirectory: true)
let scratch = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("ganjiang-promo-render", isDirectory: true)
try FileManager.default.createDirectory(at: scratch, withIntermediateDirectories: true)
let silentURL = scratch.appendingPathComponent("silent.mp4")
let finalURL = assets.appendingPathComponent("ganjiang-agent-promo.mp4")
let audioURL = scratch.appendingPathComponent("score.wav")
for url in [silentURL, finalURL, audioURL] where FileManager.default.fileExists(atPath: url.path) {
    try FileManager.default.removeItem(at: url)
}
let caseData = try JSONSerialization.jsonObject(with: Data(contentsOf: assets.appendingPathComponent("promo-case.json"))) as! [String: Any]
let rows = caseData["rows"] as! [[Double]]
let phases = caseData["phases"] as! [[String: Any]]
let maxSignal = rows.map { $0[1] }.max()!
let space = CGColorSpaceCreateDeviceRGB()
let white: [CGFloat] = [0.92, 0.96, 1]
let grey: [CGFloat] = [0.53, 0.63, 0.72]
let mint: [CGFloat] = [0.47, 0.965, 0.824]
let blue: [CGFloat] = [0.46, 0.66, 1]
let palette: [[CGFloat]] = [blue, mint, [1,0.67,0.57], [0.78,0.87,0.55], [0.72,0.54,1]]
func col(_ rgb: [CGFloat], _ a: Double = 1) -> CGColor { CGColor(colorSpace: space, components: rgb + [CGFloat(a)])! }
func ease(_ a: Double, _ b: Double, _ t: Double) -> Double {
    let v = max(0, min(1, (t-a)/(b-a))); return v*v*(3-2*v)
}
func glow(_ c: CGContext, _ x: Double, _ y: Double, _ radius: Double, _ rgb: [CGFloat], _ a: Double) {
    let g = CGGradient(colorsSpace: space, colors: [col(rgb,a),col(rgb,0)] as CFArray, locations:[0,1])!
    c.drawRadialGradient(g, startCenter:CGPoint(x:x,y:y),startRadius:0,endCenter:CGPoint(x:x,y:y),endRadius:radius,options:[])
}
func text(_ c: CGContext, _ str: String, _ x: Double, _ y: Double, _ size: Double, _ rgb: [CGFloat] = white,
          _ alpha: Double = 1, _ weight: String = "HelveticaNeue", _ tracking: Double = 0) {
    let font = CTFontCreateWithName(weight as CFString, size, nil)
    let attr = NSAttributedString(string:str,attributes:[
        NSAttributedString.Key(kCTFontAttributeName as String):font,
        NSAttributedString.Key(kCTForegroundColorAttributeName as String):col(rgb,alpha),
        NSAttributedString.Key(kCTKernAttributeName as String):tracking])
    c.saveGState(); c.translateBy(x:x,y:y+size); c.scaleBy(x:1,y:-1)
    c.textMatrix = .identity; c.textPosition = .zero
    CTLineDraw(CTLineCreateWithAttributedString(attr),c); c.restoreGState()
}
func image(_ name: String) -> CGImage {
    let url=root.appendingPathComponent("assets/images/"+name)
    return CGImageSourceCreateImageAtIndex(CGImageSourceCreateWithURL(url as CFURL,nil)!,0,nil)!
}
let artwork=image("ganjiang-science-cover.webp")
let logo=image("ganjiang-logo-small.webp")
func drawImage(_ c: CGContext, _ img: CGImage, _ rect: CGRect) {
    c.saveGState(); c.translateBy(x:rect.minX,y:rect.maxY); c.scaleBy(x:1,y:-1)
    c.draw(img,in:CGRect(x:0,y:0,width:rect.width,height:rect.height)); c.restoreGState()
}
func line(_ c: CGContext, _ x1: Double, _ y1: Double, _ x2: Double, _ y2: Double, _ rgb: [CGFloat], _ a:Double,_ width:Double=1) {
    c.setStrokeColor(col(rgb,a));c.setLineWidth(width);c.move(to:CGPoint(x:x1,y:y1));c.addLine(to:CGPoint(x:x2,y:y2));c.strokePath()
}
func plot(_ c: CGContext, _ column:Int, _ x:Double, _ baseline:Double, _ width:Double, _ amplitude:Double,
          _ rgb:[CGFloat], _ alpha:Double = 1, _ reveal:Double = 1, _ norm:Double? = nil, _ thickness:Double = 1.8) {
    c.saveGState(); c.clip(to:CGRect(x:x-5,y:baseline-amplitude-20,width:(width+10)*reveal,height:amplitude+30))
    let maximum = norm ?? maxSignal
    let path=CGMutablePath()
    for (i,row) in rows.enumerated() {
        let p=CGPoint(x:x+(row[0]-5)/70*width,y:baseline-row[column]/maximum*amplitude)
        if i==0 {path.move(to:p)} else {path.addLine(to:p)}
    }
    c.setLineJoin(.round);c.setLineCap(.round)
    for (weight,opacity) in [(thickness*5,0.035),(thickness*2.2,0.09),(thickness,1.0)] {
        c.setLineWidth(weight);c.setStrokeColor(col(rgb,alpha*opacity));c.addPath(path);c.strokePath()
    }
    c.restoreGState()
}
func artBackground(_ c:CGContext,_ time:Double,_ alpha:Double,_ right:Bool=false) {
    c.saveGState();c.setAlpha(alpha)
    let zoom=1.02+time*0.004
    let width=Double(right ? 1640 : 1920)*zoom, height=width*2/3
    let x=right ? 520-(width-1640)*0.45 : -(width-1920)*0.5
    drawImage(c,artwork,CGRect(x:x,y:(1080-height)/2-15,width:width,height:height))
    c.restoreGState()
    let shades:[CGColor] = right ? [col([0.016,0.026,0.05],1),col([0.016,0.026,0.05],0.99),col([0.016,0.026,0.05],0.04)] : [col([0.016,0.026,0.05],0.95),col([0.016,0.026,0.05],0.72),col([0.016,0.026,0.05],0.38)]
    let gradient=CGGradient(colorsSpace:space,colors:shades as CFArray,locations:[0,0.38,1])!
    c.drawLinearGradient(gradient,start:CGPoint(x:0,y:0),end:CGPoint(x:1920,y:0),options:[])
}
func upperLabel(_ c:CGContext,_ label:String) {
    line(c,132,109,163,109,mint,1,2)
    text(c,label,183,93,19,grey,1,"HelveticaNeue-Medium",3)
}
func sourceNote(_ c:CGContext,_ wording:String) { text(c,wording,132,996,18,grey,0.9) }
func sceneOne(_ c:CGContext,_ t:Double) {
    artBackground(c,t,0.18)
    upperLabel(c,"GANJIANG AGENT  /  XRD INTELLIGENCE")
    let entry=ease(0.05,0.85,t), shift=24*(1-entry)
    text(c,"A signal.",132,212+shift,104,white,entry,"HelveticaNeue-Medium",-3)
    text(c,"A hidden material story.",132,327+shift,90,white,entry,"HelveticaNeue-Medium",-2.7)
    text(c,"Let the pattern speak.",137,470,30,grey,ease(0.6,1.2,t))
    let reveal=0.05+0.95*ease(0,2.2,t)
    for y in [695.0,805.0,915.0] {line(c,132,y,1788,y,blue,0.10)}
    plot(c,1,132,920,1656,340,white,0.9,reveal)
    let scan=132+1656*reveal
    glow(c,scan,795,170,mint,0.08)
    line(c,scan,620,scan,926,mint,0.6*(1-ease(2,2.6,t)),1.5)
    text(c,"POWDER X-RAY DIFFRACTION",132,949,18,grey,1,"HelveticaNeue",2)
    text(c,"5°",1706,949,18,grey);text(c,"75°  2θ",1740,949,18,grey)
}
func sceneTwo(_ c:CGContext,_ t:Double) {
    glow(c,800,420,760,blue,0.045)
    upperLabel(c,"01 IDENTIFY  →  02 QUANTIFY")
    let entry=ease(2.45,2.95,t)
    text(c,"One pattern. Five phases.",132,169+15*(1-entry),82,white,1,"HelveticaNeue-Medium",-2)
    text(c,"An ancient cosmetic. A measurable composition.",136,282,29,grey)
    let reveal=ease(2.55,4.1,t)
    plot(c,1,132,413,1080,104,white,0.38)
    for (i,phase) in phases.enumerated() {
        let rowY=494+Double(i)*89
        let progress=ease(2.65+Double(i)*0.16,3.8+Double(i)*0.16,t)
        let split=ease(2.6,4.0,t)
        let base=413*(1-split)+rowY*split
        let maximum=rows.map{$0[i+4]}.max()!
        plot(c,i+4,132,base,1080,63+36*(1-split),palette[i],progress,reveal,maximum,1.7)
        line(c,132,rowY+12,1212,rowY+12,blue,0.10*split)
        let x=1294+16*(1-progress)
        line(c,x,rowY-30,x+22,rowY-30,palette[i],progress,3)
        text(c,phase["en"] as! String,x+36,rowY-62,29,white,progress,"HelveticaNeue-Medium")
        text(c,phase["formula"] as! String,x+36,rowY-24,21,grey,progress)
        text(c,String(format:"%.2f",phase["fraction"] as! Double),1630,rowY-57,40,palette[i],progress,"HelveticaNeue-Light",-1)
        text(c,"%",1750,rowY-39,22,grey,progress)
    }
    sourceNote(c,"CASE STUDY  ·  Egyptian cosmetic powder  ·  Reported mass fractions")
}
func sceneThree(_ c:CGContext,_ t:Double) {
    artBackground(c,t,0.92,true)
    upperLabel(c,"03 REFINE  →  INSPECT THE EVIDENCE")
    let shift=15*(1-ease(6.0,6.65,t))
    text(c,"Identify.",132,221+shift,100,white,1,"HelveticaNeue-Medium",-3)
    text(c,"Quantify.",132,330+shift,100,white,1,"HelveticaNeue-Medium",-3)
    text(c,"Verify.",132,439+shift,100,mint,1,"HelveticaNeue-Medium",-3)
    text(c,"From complex signals",136,592,32,white)
    text(c,"to a reviewable material analysis.",136,636,32,white)
    text(c,"RIETVELD REFINEMENT",136,740,18,grey,1,"HelveticaNeue",2)
    plot(c,1,136,899,760,112,white,0.40)
    plot(c,2,136,899,760,112,mint,0.9,ease(6.1,7.6,t))
    line(c,136,941,162,941,white,0.55,2);text(c,"Measured",173,926,18,grey)
    line(c,296,941,322,941,mint,1,2);text(c,"Fitted",334,926,18,grey)
    text(c,"Rwp  13.079%",655,926,21,mint)
    sourceNote(c,"Reported case fit  ·  Crystal artwork is illustrative  ·  Sequence condensed")
}
func sceneFour(_ c:CGContext,_ t:Double) {
    artBackground(c,t,0.9,true)
    let appear=ease(8.85,9.6,t), shift=18*(1-appear)
    drawImage(c,logo,CGRect(x:123,y:195+shift,width:143,height:143))
    text(c,"MATERIAL INTELLIGENCE",138,362+shift,20,mint,appear,"HelveticaNeue-Medium",4)
    text(c,"GanJiang",127,405+shift,128,white,appear,"HelveticaNeue-Medium",-4)
    text(c,"AGENT",141,562+shift,28,grey,appear,"HelveticaNeue",8)
    line(c,139,643,221,643,mint,appear,2)
    text(c,"Read the pattern.",135,684,46,white,appear,"HelveticaNeue",-0.5)
    text(c,"Understand the material.",135,742,46,white,appear,"HelveticaNeue",-0.5)
    text(c,"ganjiang.asia",138,925,28,mint,ease(9.35,10,t),"HelveticaNeue-Medium",0.5)
    text(c,"XRD SCIENCE AGENT",1445,989,18,grey,0.8,"HelveticaNeue",2)
}
func render(_ c:CGContext,_ t:Double) {
    c.translateBy(x:0,y:CGFloat(H));c.scaleBy(x:1,y:-1)
    c.setFillColor(col([0.016,0.026,0.05]));c.fill(CGRect(x:0,y:0,width:W,height:H))
    let cuts=[2.65,6.05,8.95]
    let funcs:[(CGContext,Double)->Void]=[sceneOne,sceneTwo,sceneThree,sceneFour]
    var current=0
    for cut in cuts where t>=cut+0.3 { current+=1 }
    c.saveGState();funcs[current](c,t);c.restoreGState()
    if current<3 {
        let blend=ease(cuts[current]-0.25,cuts[current]+0.3,t)
        if blend>0 {
            c.saveGState();c.setAlpha(blend);c.beginTransparencyLayer(auxiliaryInfo:nil)
            c.setFillColor(col([0.016,0.026,0.05]));c.fill(CGRect(x:0,y:0,width:W,height:H))
            funcs[current+1](c,t);c.endTransparencyLayer();c.restoreGState()
        }
    }
    // A quiet inset timeline runs along the bottom; the final brand holds for 2.5 seconds.
    line(c,132,1050,1788,1050,grey,0.14)
    line(c,132,1050,132+1656*min(1,t/seconds),1050,mint,0.65,1.5)
}
func saveJPEG(_ image:CGImage,_ url:URL,_ quality:Double=0.9) {
    let out=CGImageDestinationCreateWithURL(url as CFURL,UTType.jpeg.identifier as CFString,1,nil)!
    CGImageDestinationAddImage(out,image,[kCGImageDestinationLossyCompressionQuality:quality] as CFDictionary)
    precondition(CGImageDestinationFinalize(out),"Cannot save preview")
}
let writer=try AVAssetWriter(outputURL:silentURL,fileType:.mp4)
writer.shouldOptimizeForNetworkUse=true
let input=AVAssetWriterInput(mediaType:.video,outputSettings:[AVVideoCodecKey:AVVideoCodecType.h264,
    AVVideoWidthKey:W,AVVideoHeightKey:H,AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:6_000_000,
    AVVideoProfileLevelKey:AVVideoProfileLevelH264HighAutoLevel,AVVideoMaxKeyFrameIntervalKey:30]])
input.expectsMediaDataInRealTime=false
let adaptor=AVAssetWriterInputPixelBufferAdaptor(assetWriterInput:input,sourcePixelBufferAttributes:[
    kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32ARGB,
    kCVPixelBufferWidthKey as String:W,kCVPixelBufferHeightKey as String:H,
    kCVPixelBufferCGImageCompatibilityKey as String:true,kCVPixelBufferCGBitmapContextCompatibilityKey as String:true])
writer.add(input)
guard writer.startWriting() else {fatalError("Encoder unavailable: \(String(describing:writer.error))")}
writer.startSession(atSourceTime:.zero)
for frame in 0..<Int(seconds*Double(fps)) {
    while !input.isReadyForMoreMediaData {
        if writer.status == .failed {fatalError("Encoding failed: \(String(describing:writer.error))")}
        Thread.sleep(forTimeInterval:0.002)
    }
    try autoreleasepool {
        var buffer:CVPixelBuffer?
        precondition(CVPixelBufferPoolCreatePixelBuffer(nil,adaptor.pixelBufferPool!,&buffer)==kCVReturnSuccess)
        let pixel=buffer!;CVPixelBufferLockBaseAddress(pixel,[])
        let context=CGContext(data:CVPixelBufferGetBaseAddress(pixel),width:W,height:H,bitsPerComponent:8,
            bytesPerRow:CVPixelBufferGetBytesPerRow(pixel),space:space,bitmapInfo:CGImageAlphaInfo.noneSkipFirst.rawValue)!
        render(context,Double(frame)/Double(fps))
        if [45,144,225,330].contains(frame),let img=context.makeImage() {
            saveJPEG(img,scratch.appendingPathComponent("scene-\(frame).jpg"))
            if frame==330 {saveJPEG(img,assets.appendingPathComponent("ganjiang-agent-promo-poster.jpg"))}
        }
        CVPixelBufferUnlockBaseAddress(pixel,[])
        guard adaptor.append(pixel,withPresentationTime:CMTime(value:Int64(frame),timescale:fps)) else {
            throw writer.error ?? NSError(domain:"Promo",code:1)
        }
    }
    if frame%90==0 {print("Rendered \(frame)/360 frames");fflush(stdout)}
}
input.markAsFinished();writer.endSession(atSourceTime:CMTime(seconds:seconds,preferredTimescale:fps))
let done=DispatchSemaphore(value:0);writer.finishWriting{done.signal()};done.wait()
guard writer.status == .completed else {fatalError("Video failed: \(String(describing:writer.error))")}

// Original synthesized sound design: a restrained pad, scan swells and a resolved brand motif.
let rate=48000, count=Int(seconds*48000)
var pcm=Data(capacity:count*4)
var noiseState:UInt64=73027
var lowNoise=0.0
for n in 0..<count {
    let t=Double(n)/Double(rate)
    let envelope=ease(0,0.8,t)*(1-ease(10.5,12,t))
    let base=(sin(2*Double.pi*110*t)*0.036+sin(2*Double.pi*164.8138*t)*0.025+sin(2*Double.pi*220*t)*0.019)*envelope
    var melody=0.0
    for (start,freq) in [(0.18,440.0),(2.65,523.251),(3.0,659.255),(6.05,587.33),(8.95,440.0),(9.17,659.255),(9.42,880.0)] {
        let dt=t-start
        if dt>0 && dt<3 {melody += sin(2*Double.pi*freq*dt)*exp(-dt*2.2)*min(1,dt/0.025)*0.058}
    }
    noiseState=noiseState &* 6364136223846793005 &+ 1442695040888963407
    let noise=Double(noiseState>>33)/Double(UInt32.max)*2-0.5
    lowNoise=lowNoise*0.94+noise*0.06
    let swells=[2.65,6.05,8.95].reduce(0.0){$0+exp(-pow((t-$1+0.14)/0.24,2))}
    let sound=(base+melody+lowNoise*swells*0.24)*min(1,(12-t)/0.25)
    for gain in [0.97,1.0] {
        var sample=Int16(max(-1,min(1,sound*gain))*32767).littleEndian
        withUnsafeBytes(of:&sample){pcm.append(contentsOf:$0)}
    }
}
func u16(_ n:UInt16)->Data{var v=n.littleEndian;return withUnsafeBytes(of:&v){Data($0)}}
func u32(_ n:UInt32)->Data{var v=n.littleEndian;return withUnsafeBytes(of:&v){Data($0)}}
var wav=Data("RIFF".utf8);wav.append(u32(UInt32(pcm.count+36)));wav.append(Data("WAVEfmt ".utf8))
wav.append(u32(16));wav.append(u16(1));wav.append(u16(2));wav.append(u32(UInt32(rate)))
wav.append(u32(UInt32(rate*4)));wav.append(u16(4));wav.append(u16(16));wav.append(Data("data".utf8));wav.append(u32(UInt32(pcm.count)));wav.append(pcm)
try wav.write(to:audioURL)
let videoAsset=AVURLAsset(url:silentURL),audioAsset=AVURLAsset(url:audioURL)
let composition=AVMutableComposition()
let timeRange=CMTimeRange(start:.zero,duration:CMTime(seconds:seconds,preferredTimescale:fps))
try composition.addMutableTrack(withMediaType:.video,preferredTrackID:kCMPersistentTrackID_Invalid)!.insertTimeRange(timeRange,of:videoAsset.tracks(withMediaType:.video)[0],at:.zero)
try composition.addMutableTrack(withMediaType:.audio,preferredTrackID:kCMPersistentTrackID_Invalid)!.insertTimeRange(timeRange,of:audioAsset.tracks(withMediaType:.audio)[0],at:.zero)
let exporter=AVAssetExportSession(asset:composition,presetName:AVAssetExportPreset1920x1080)!
exporter.outputURL=finalURL;exporter.outputFileType = .mp4;exporter.shouldOptimizeForNetworkUse=true
let exported=DispatchSemaphore(value:0);exporter.exportAsynchronously{exported.signal()};exported.wait()
guard exporter.status == .completed else {fatalError("Final export failed: \(String(describing:exporter.error))")}
print("Created \(finalURL.path): 12 seconds, 1920×1080, English titles, original score")
print("Preview stills: \(scratch.path)")
