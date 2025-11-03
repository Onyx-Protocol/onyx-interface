import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import Konva from 'konva';

const EtsyManager: React.FC = () => {
  const [mockupImage, setMockupImage] = useState<HTMLImageElement | null>(null);
  const [insertImage, setInsertImage] = useState<HTMLImageElement | null>(null);
  const [insertPos, setInsertPos] = useState({ x: 50, y: 50 });
  const [insertSize, setInsertSize] = useState({ width: 150, height: 150 });
  const [insertRotation, setInsertRotation] = useState(0);

  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const handleMockupUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => setMockupImage(img);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleInsertUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => setInsertImage(img);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleExport = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL({ mimeType: 'image/jpeg', quality: 0.9 });
      const link = document.createElement('a');
      link.download = 'mockup.jpg';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [insertImage]);

  return (
    <div>
      <h1>Etsy Manager</h1>
      <p>Manage your JPEG inserts on mockups here.</p>

      <div>
        <label htmlFor="mockup-upload">Upload Mockup:</label>
        <input type="file" id="mockup-upload" accept="image/jpeg,image/png" onChange={handleMockupUpload} />
      </div>

      <div>
        <label htmlFor="insert-upload">Upload JPEG Insert:</label>
        <input type="file" id="insert-upload" accept="image/jpeg" onChange={handleInsertUpload} />
      </div>

      <button onClick={handleExport} style={{ marginTop: '10px' }}>Export as JPEG</button>

      <Stage
        ref={stageRef}
        width={mockupImage?.width || 800}
        height={mockupImage?.height || 600}
        style={{ border: '1px solid black', marginTop: '10px' }}
      >
        <Layer>
          {mockupImage && <KonvaImage image={mockupImage} />}
          {insertImage && (
            <>
              <KonvaImage
                ref={shapeRef}
                image={insertImage}
                x={insertPos.x}
                y={insertPos.y}
                width={insertSize.width}
                height={insertSize.height}
                rotation={insertRotation}
                draggable
                onDragEnd={(e) => {
                  setInsertPos({ x: e.target.x(), y: e.target.y() });
                }}
                onTransformEnd={() => {
                  if (shapeRef.current) {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    setInsertSize({
                      width: Math.max(5, node.width() * scaleX),
                      height: Math.max(node.height() * scaleY),
                    });
                    setInsertRotation(node.rotation());
                  }
                }}
              />
              <Transformer ref={trRef} />
            </>
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default EtsyManager;
