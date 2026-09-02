# AnteynX — Custom RF & Antenna Engineering

> **"Your Requirement. Our Antenna."**
> Custom antenna design and electromagnetic simulation engineered around your application.

AnteynX is a modern, deep-tech website for a custom RF & antenna engineering startup. The platform provides interactive simulation tools, an engineering design calculator, sample demonstration projects, and a comprehensive RF requirement quote submission form.

---

## 🚀 Key Features & Pages

- **Interactive 3D EM Wave Visualizer**: Real-time Poynting vector, $\vec{E}$ & $\vec{H}$ vector fields, microstrip patch geometry, and spherical wavefront rendering on HTML5 Canvas.
- **Interactive 3D Radiation Pattern & 2D Cuts**: Far-field gain lobe 3D renderer with E-plane and H-plane cut toggle.
- **$S_{11}$ Return Loss Plotter**: Simulated return loss graph with interactive frequency hover tooltips and -10 dB bandwidth indicators.
- **Parametric Patch Antenna Calculator**: Real-time calculation of patch dimensions ($W$, $L$), guided wavelength ($\lambda_g$), and dielectric substrate parameters.
- **50-Ohm Smith Chart Visualizer**: Impedance matching visualization.
- **8 Core Pages**:
  1. **Home**: Hero with 3D EM wave canvas, problem vs solution matrix, 6-step design process, spec calculator teaser, featured projects, and capabilities roadmap.
  2. **Services**: Custom Antenna Design, HFSS & CST EM Simulation, Optimization, Arrays, MIMO, and Deliverables package.
  3. **Antenna Technologies**: Interactive 11-technology selector (Microstrip Patch, Slot, Monopole/Dipole, Wideband, Compact PIFA, MIMO, Array, Circularly Polarized, Dual/Multi-Band, Metamaterial, Phased Arrays).
  4. **Applications**: Filterable cards for UAVs, IoT, Robotics, Wireless, Aerospace, Defence, R&D Labs, and RF Electronics.
  5. **Portfolio**: Engineering Demonstration Projects with interactive S11 plots and 3D directivity lobes.
  6. **About**: Mission statement, service scope disclaimer, 4-phase strategic roadmap (NOW -> NEXT -> FUTURE -> VISION).
  7. **Contact**: Inquiry form and placeholder details.
  8. **Request a Quote**: Full RF Requirement Form with contact details, specs, project parameters, drag-and-drop file uploader UI, and real-time summary card.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Deep-Tech Theme (`#070B14`, `#0E1628`, `#00F0FF`)
- **Icons**: Lucide React
- **Graphics**: HTML5 Canvas 2D/3D & SVG

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/Rajakumar001-logy/AnteynX.git
cd AnteynX

# Install dependencies
npm install

# Start local development server
npm run dev
```

Server will run on `http://localhost:3000`.

### Production Build

```bash
npm run build
```

Bundle will be compiled into the `dist/` directory.

---

## 📄 License

© 2026 **AnteynX Engineering Labs**. All rights reserved.
