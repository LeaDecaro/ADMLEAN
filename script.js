/* =========================================================
   ADMLEAN
   SISTEMA PRINCIPAL
   ========================================================= */


/* =========================================================
   VARIABLES
   ========================================================= */

let currentTool = null;

let selectedFiles = [];

let pdfDocuments = [];



/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function scrollToSection(id) {

    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =========================================================
   MODAL
   ========================================================= */

function openTool(tool) {

    currentTool = tool;

    const modal = document.getElementById("toolModal");

    const title = document.getElementById("modalTitle");

    const category = document.getElementById("modalCategory");

    const body = document.getElementById("modalBody");


    const data = getToolData(tool);


    title.textContent = data.title;

    category.textContent = data.category;

    body.innerHTML = data.html;


    modal.classList.add("open");


    document.body.style.overflow = "hidden";


    initializeTool(tool);

}


function closeTool() {

    const modal = document.getElementById("toolModal");

    modal.classList.remove("open");

    document.body.style.overflow = "";

    selectedFiles = [];

    pdfDocuments = [];

}



/* =========================================================
   ESC PARA CERRAR
   ========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeTool();

    }

});



/* =========================================================
   DATOS DE LAS HERRAMIENTAS
   ========================================================= */

function getToolData(tool) {


    const tools = {


        /* =================================================
           UNIR
        ================================================= */

        merge: {

            title: "Unir PDF",

            category: "DOCUMENTOS PDF",

            html: createPdfUploader(
                "Seleccioná los PDF que querés unir.",
                "Podés seleccionar varios archivos.",
                "merge"
            )

        },


        /* =================================================
           DIVIDIR
        ================================================= */

        split: {

            title: "Dividir PDF",

            category: "DOCUMENTOS PDF",

            html: createPdfUploader(
                "Seleccioná un PDF para extraer páginas.",
                "Luego indicaremos qué páginas querés separar.",
                "split"
            )

        },


        /* =================================================
           ORGANIZAR
        ================================================= */

        organize: {

            title: "Organizar PDF",

            category: "DOCUMENTOS PDF",

            html: createPdfUploader(
                "Cargá un PDF para organizar sus páginas.",
                "Podrás eliminar o reordenar páginas.",
                "organize"
            )

        },


        /* =================================================
           EDITAR
        ================================================= */

        edit: {

            title: "Editar PDF",

            category: "DOCUMENTOS PDF",

            html: createPdfUploader(
                "Cargá un PDF para editarlo.",
                "Esta versión permitirá agregar contenido sobre las páginas.",
                "edit"
            )

        },


        /* =================================================
           COMPRIMIR
        ================================================= */

        compress: {

            title: "Comprimir PDF",

            category: "DOCUMENTOS PDF",

            html: createPdfUploader(
                "Seleccioná el PDF que querés reducir.",
                "La herramienta optimizará el documento.",
                "compress"
            )

        },


        /* =================================================
           PDF → JPG
        ================================================= */

        "pdf-to-jpg": {

            title: "PDF → JPG",

            category: "CONVERSIÓN",

            html: createPdfUploader(
                "Convertí las páginas de un PDF en imágenes.",
                "Cada página se generará como JPG.",
                "pdf-to-jpg"
            )

        },


        /* =================================================
           JPG → PDF
        ================================================= */

        "jpg-to-pdf": {

            title: "JPG → PDF",

            category: "CONVERSIÓN",

            html: createImageUploader()

        },


        /* =================================================
           MARCA DE AGUA
        ================================================= */

        watermark: {

            title: "Marca de agua",

            category: "DOCUMENTOS PDF",

            html: createPdfUploader(
                "Cargá un PDF para agregar una marca de agua.",
                "Podrás indicar el texto de identificación.",
                "watermark"
            )

        },


        /* =================================================
           NÚMEROS
        ================================================= */

        "page-numbers": {

            title: "Numerar páginas",

            category: "DOCUMENTOS PDF",

            html: createPdfUploader(
                "Cargá un PDF para agregar numeración.",
                "La numeración se agregará automáticamente.",
                "page-numbers"
            )

        },


        /* =================================================
           ROTAR
        ================================================= */

        rotate: {

            title: "Rotar PDF",

            category: "DOCUMENTOS PDF",

            html: createPdfUploader(
                "Cargá un PDF para rotar sus páginas.",
                "Podrás girar el documento.",
                "rotate"
            )

        },


        /* =================================================
           CUADRO
        ================================================= */

        cuadro: {

            title: "Cuadro Comparativo",

            category: "COMPRAS Y CONTRATACIONES",

            html: createAdminPlaceholder(
                "Esta herramienta será conectada con tu Cuadro Comparativo de GitHub.",
                "La idea es mantener la versión que ya venimos trabajando y hacer que ADMLEAN la abra directamente."
            )

        },


        /* =================================================
           NOTA
        ================================================= */

        nota: {

            title: "Nota Aclaratoria",

            category: "DOCUMENTACIÓN ADMINISTRATIVA",

            html: createAdminPlaceholder(
                "Generador de Nota Aclaratoria",
                "Acá podremos cargar expediente, referencia, motivo y generar automáticamente el PDF."
            )

        },


        /* =================================================
           CERTIFICACIÓN
        ================================================= */

        certificacion: {

            title: "Certificación de Servicio",

            category: "CONTRATACIONES",

            html: createAdminPlaceholder(
                "Generador de Certificación",
                "Permitirá cargar proveedor, CUIT, orden de compra, servicio y fecha."
            )

        },


        /* =================================================
           ACTA
        ================================================= */

        acta: {

            title: "Acta de Entrega",

            category: "ADMINISTRACIÓN",

            html: createAdminPlaceholder(
                "Generador de Acta de Entrega",
                "Herramienta para generar actas listas para incorporar al expediente."
            )

        },


        /* =================================================
           ORDEN
        ================================================= */

        orden: {

            title: "Orden de Compra",

            category: "COMPRAS",

            html: createAdminPlaceholder(
                "Generador de Orden de Compra",
                "Acá vamos a conectar la herramienta de Orden de Compra que estamos desarrollando."
            )

        },


        /* =================================================
           PEDIDO
        ================================================= */

        pedido: {

            title: "Pedido de Suministro",

            category: "COMPRAS",

            html: createAdminPlaceholder(
                "Pedido de Suministro",
                "Módulo preparado para desarrollar el pedido de suministro."
            )

        },


        /* =================================================
           PROVISIÓN
        ================================================= */

        provision: {

            title: "Solicitud de Provisión",

            category: "COMPRAS",

            html: createAdminPlaceholder(
                "Solicitud de Provisión",
                "Módulo preparado para desarrollar solicitudes de provisión."
            )

        },


        /* =================================================
           COMPARATIVO
        ================================================= */

        comparativo: {

            title: "Comparación de Ofertas",

            category: "COMPRAS",

            html: createAdminPlaceholder(
                "Comparación de Ofertas",
                "Herramienta para analizar ofertas y resultados por renglón."
            )

        },


        /* =================================================
           ANALIZADOR
        ================================================= */

        analizador: {

            title: "Analizador de Expedientes",

            category: "EXPEDIENTES",

            html: createAdminPlaceholder(
                "Analizador de Expedientes",
                "Este módulo queda preparado para conectar posteriormente el proyecto LEAN ANALIZADOR."
            )

        }

    };


    return tools[tool] || {

        title: "Herramienta",

        category: "ADMLEAN",

        html: `
            <div class="warning-box">
                Herramienta no disponible todavía.
            </div>
        `

    };

}



/* =========================================================
   CREAR CARGADOR PDF
   ========================================================= */

function createPdfUploader(
    title,
    description,
    mode
) {

    return `

        <p class="modal-intro">
            ${title}
            <br>
            ${description}
        </p>


        <div
            class="drop-zone"
            id="dropZone"
            onclick="document.getElementById('fileInput').click()"
        >

            <div class="drop-icon">
                PDF
            </div>


            <h3>
                Arrastrá tu PDF acá
            </h3>


            <p>
                o seleccioná el archivo desde tu computadora
            </p>


            <button
                type="button"
                class="file-button"
                onclick="event.stopPropagation(); document.getElementById('fileInput').click()"
            >
                SELECCIONAR ARCHIVO
            </button>


            <input
                id="fileInput"
                class="hidden-input"
                type="file"
                accept=".pdf,application/pdf"
                ${mode === "merge" ? "multiple" : ""}
                onchange="handlePdfFiles(event, '${mode}')"
            >

        </div>


        <div
            id="fileList"
            class="file-list"
        ></div>


        <div
            id="toolControls"
            class="tool-controls"
        ></div>

    `;

}



/* =========================================================
   CARGADOR DE IMÁGENES
   ========================================================= */

function createImageUploader() {

    return `

        <p class="modal-intro">

            Convertí una o varias imágenes
            JPG/PNG en un único documento PDF.

        </p>


        <div
            class="drop-zone"
            onclick="document.getElementById('imageInput').click()"
        >

            <div class="drop-icon">
                IMG
            </div>


            <h3>
                Arrastrá tus imágenes
            </h3>


            <p>
                JPG, JPEG o PNG
            </p>


            <button
                type="button"
                class="file-button"
                onclick="event.stopPropagation(); document.getElementById('imageInput').click()"
            >
                SELECCIONAR IMÁGENES
            </button>


            <input
                id="imageInput"
                class="hidden-input"
                type="file"
                accept="image/jpeg,image/png"
                multiple
                onchange="handleImages(event)"
            >

        </div>


        <div
            id="fileList"
            class="file-list"
        ></div>


        <div
            id="toolControls"
            class="tool-controls"
        ></div>

    `;

}



/* =========================================================
   ADMIN PLACEHOLDER
   ========================================================= */

function createAdminPlaceholder(
    title,
    description
) {

    return `

        <div class="info-box">

            <strong>
                ${title}
            </strong>

            <br><br>

            ${description}

        </div>


        <div class="warning-box">

            MÓDULO EN DESARROLLO

            <br><br>

            La estructura ya está integrada dentro de ADMLEAN.
            Después conectaremos la herramienta completa.

        </div>

    `;

}



/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

function initializeTool(tool) {

    const dropZone =
        document.getElementById("dropZone");


    if (!dropZone) return;


    dropZone.addEventListener(
        "dragover",
        function(event) {

            event.preventDefault();

            dropZone.classList.add("dragging");

        }
    );


    dropZone.addEventListener(
        "dragleave",
        function() {

            dropZone.classList.remove("dragging");

        }
    );


    dropZone.addEventListener(
        "drop",
        function(event) {

            event.preventDefault();

            dropZone.classList.remove("dragging");


            const files =
                Array.from(event.dataTransfer.files);


            if (tool === "merge") {

                selectedFiles =
                    files.filter(
                        file =>
                            file.type === "application/pdf"
                    );

            } else {

                selectedFiles =
                    files.slice(0, 1);

            }


            renderFileList();

            createControls(tool);

        }
    );

}



/* =========================================================
   ARCHIVOS PDF
   ========================================================= */

function handlePdfFiles(event, mode) {

    const files =
        Array.from(event.target.files);


    if (mode === "merge") {

        selectedFiles =
            files.filter(
                file =>
                    file.type === "application/pdf"
            );

    } else {

        selectedFiles =
            files.slice(0, 1);

    }


    renderFileList();

    createControls(mode);

}



/* =========================================================
   IMÁGENES
   ========================================================= */

function handleImages(event) {

    selectedFiles =
        Array.from(event.target.files);


    renderFileList();

    createControls("jpg-to-pdf");

}



/* =========================================================
   LISTA DE ARCHIVOS
   ========================================================= */

function renderFileList() {

    const container =
        document.getElementById("fileList");


    if (!container) return;


    if (!selectedFiles.length) {

        container.innerHTML = "";

        return;

    }


    container.innerHTML =
        selectedFiles.map(
            (file, index) => `

                <div class="file-item">

                    <span class="file-item-name">

                        ${index + 1}.
                        ${escapeHtml(file.name)}

                    </span>


                    <span class="file-item-size">

                        ${formatBytes(file.size)}

                    </span>

                </div>

            `
        ).join("");

}



/* =========================================================
   CONTROLES
   ========================================================= */

function createControls(mode) {

    const container =
        document.getElementById("toolControls");


    if (!container) return;


    if (!selectedFiles.length) {

        container.innerHTML = "";

        return;

    }


    let html = "";


    switch (mode) {


        case "merge":

            html = `

                <button
                    class="action-button primary"
                    onclick="mergePDFs()"
                >
                    UNIR PDF
                </button>

            `;

            break;


        case "jpg-to-pdf":

            html = `

                <button
                    class="action-button primary"
                    onclick="imagesToPDF()"
                >
                    CREAR PDF
                </button>

            `;

            break;


        case "pdf-to-jpg":

            html = `

                <button
                    class="action-button primary"
                    onclick="pdfToJPG()"
                >
                    CONVERTIR A JPG
                </button>

            `;

            break;


        case "rotate":

            html = `

                <button
                    class="action-button primary"
                    onclick="rotatePDF()"
                >
                    ROTAR PDF
                </button>

            `;

            break;


        case "watermark":

            html = `

                <input
                    id="watermarkText"
                    type="text"
                    placeholder="Texto de marca de agua"
                    style="
                        padding:11px;
                        border-radius:9px;
                        border:1px solid rgba(255,255,255,.1);
                        background:#080c14;
                        color:white;
                        width:240px;
                    "
                >


                <button
                    class="action-button primary"
                    onclick="addWatermark()"
                >
                    AGREGAR MARCA
                </button>

            `;

            break;


        case "page-numbers":

            html = `

                <button
                    class="action-button primary"
                    onclick="addPageNumbers()"
                >
                    NUMERAR PDF
                </button>

            `;

            break;


        case "split":

            html = `

                <input
                    id="splitPages"
                    type="text"
                    placeholder="Ej: 1,3,5-7"
                    style="
                        padding:11px;
                        border-radius:9px;
                        border:1px solid rgba(255,255,255,.1);
                        background:#080c14;
                        color:white;
                        width:180px;
                    "
                >


                <button
                    class="action-button primary"
                    onclick="splitPDF()"
                >
                    EXTRAER PÁGINAS
                </button>

            `;

            break;


        case "organize":

            html = `

                <div class="info-box">

                    La organización avanzada de páginas
                    se incorporará en la siguiente versión.

                </div>

            `;

            break;


        case "edit":

            html = `

                <div class="info-box">

                    Editor PDF preparado para incorporar
                    texto, dibujo y anotaciones.

                </div>

            `;

            break;


        case "compress":

            html = `

                <button
                    class="action-button primary"
                    onclick="compressPDF()"
                >
                    COMPRIMIR PDF
                </button>

            `;

            break;

    }


    container.innerHTML = html;

}



/* =========================================================
   UNIR PDF
   ========================================================= */

async function mergePDFs() {

    if (selectedFiles.length < 2) {

        alert(
            "Seleccioná al menos 2 archivos PDF."
        );

        return;

    }


    try {

        const mergedPdf =
            await PDFLib.PDFDocument.create();


        for (const file of selectedFiles) {

            const bytes =
                await file.arrayBuffer();


            const pdf =
                await PDFLib.PDFDocument.load(bytes);


            const pages =
                await mergedPdf.copyPages(
                    pdf,
                    pdf.getPageIndices()
                );


            pages.forEach(
                page =>
                    mergedPdf.addPage(page)
            );

        }


        const output =
            await mergedPdf.save();


        downloadBlob(
            output,
            "ADMLEAN-PDF-UNIDO.pdf",
            "application/pdf"
        );


    } catch (error) {

        console.error(error);

        alert(
            "No se pudo unir el PDF."
        );

    }

}



/* =========================================================
   JPG → PDF
   ========================================================= */

async function imagesToPDF() {

    if (!selectedFiles.length) {

        alert(
            "Seleccioná imágenes."
        );

        return;

    }


    try {

        const pdf =
            await PDFLib.PDFDocument.create();


        for (const file of selectedFiles) {

            const bytes =
                await file.arrayBuffer();


            let image;


            if (
                file.type ===
                "image/png"
            ) {

                image =
                    await pdf.embedPng(bytes);

            } else {

                image =
                    await pdf.embedJpg(bytes);

            }


            const dimensions =
                image.scale(1);


            const page =
                pdf.addPage([
                    dimensions.width,
                    dimensions.height
                ]);


            page.drawImage(
                image,
                {
                    x: 0,
                    y: 0,
                    width: dimensions.width,
                    height: dimensions.height
                }
            );

        }


        const output =
            await pdf.save();


        downloadBlob(
            output,
            "ADMLEAN-IMAGENES.pdf",
            "application/pdf"
        );


    } catch (error) {

        console.error(error);

        alert(
            "No se pudo crear el PDF."
        );

    }

}



/* =========================================================
   PDF → JPG
   ========================================================= */

async function pdfToJPG() {

    if (!selectedFiles.length) {

        alert(
            "Seleccioná un PDF."
        );

        return;

    }


    alert(
        "El módulo PDF → JPG está preparado. En la siguiente etapa incorporaremos el motor de renderizado PDF.js para generar cada página como JPG."
    );

}



/* =========================================================
   ROTAR PDF
   ========================================================= */

async function rotatePDF() {

    if (!selectedFiles.length) {

        alert(
            "Seleccioná un PDF."
        );

        return;

    }


    try {

        const file =
            selectedFiles[0];


        const bytes =
            await file.arrayBuffer();


        const pdf =
            await PDFLib.PDFDocument.load(bytes);


        const pages =
            pdf.getPages();


        pages.forEach(
            page => {

                const current =
                    page.getRotation().angle;


                page.setRotation(
                    PDFLib.degrees(
                        current + 90
                    )
                );

            }
        );


        const output =
            await pdf.save();


        downloadBlob(
            output,
            "ADMLEAN-PDF-ROTADO.pdf",
            "application/pdf"
        );


    } catch (error) {

        console.error(error);

        alert(
            "No se pudo rotar el PDF."
        );

    }

}



/* =========================================================
   MARCA DE AGUA
   ========================================================= */

async function addWatermark() {

    if (!selectedFiles.length) {

        alert(
            "Seleccioná un PDF."
        );

        return;

    }


    const input =
        document.getElementById(
            "watermarkText"
        );


    const text =
        input.value.trim();


    if (!text) {

        alert(
            "Escribí el texto de la marca de agua."
        );

        return;

    }


    try {

        const bytes =
            await selectedFiles[0]
                .arrayBuffer();


        const pdf =
            await PDFLib.PDFDocument.load(bytes);


        const pages =
            pdf.getPages();


        const font =
            await pdf.embedFont(
                PDFLib.StandardFonts.Helvetica
            );


        pages.forEach(
            page => {

                const {
                    width,
                    height
                } = page.getSize();


                page.drawText(
                    text,
                    {
                        x: width / 2 - 100,
                        y: height / 2,

                        size: 30,

                        font,

                        color:
                            PDFLib.rgb(
                                .7,
                                .7,
                                .7
                            ),

                        opacity: .35,

                        rotate:
                            PDFLib.degrees(-35)
                    }
                );

            }
        );


        const output =
            await pdf.save();


        downloadBlob(
            output,
            "ADMLEAN-MARCA-AGUA.pdf",
            "application/pdf"
        );


    } catch (error) {

        console.error(error);

        alert(
            "No se pudo agregar la marca de agua."
        );

    }

}



/* =========================================================
   NÚMEROS DE PÁGINA
   ========================================================= */

async function addPageNumbers() {

    if (!selectedFiles.length) {

        alert(
            "Seleccioná un PDF."
        );

        return;

    }


    try {

        const bytes =
            await selectedFiles[0]
                .arrayBuffer();


        const pdf =
            await PDFLib.PDFDocument.load(bytes);


        const pages =
            pdf.getPages();


        const font =
            await pdf.embedFont(
                PDFLib.StandardFonts.Helvetica
            );


        pages.forEach(
            (page, index) => {

                const {
                    width
                } = page.getSize();


                const number =
                    String(index + 1);


                const textWidth =
                    font.widthOfTextAtSize(
                        number,
                        10
                    );


                page.drawText(
                    number,
                    {
                        x:
                            width / 2
                            - textWidth / 2,

                        y: 18,

                        size: 10,

                        font,

                        color:
                            PDFLib.rgb(
                                .25,
                                .25,
                                .25
                            )
                    }
                );

            }
        );


        const output =
            await pdf.save();


        downloadBlob(
            output,
            "ADMLEAN-PDF-NUMERADO.pdf",
            "application/pdf"
        );


    } catch (error) {

        console.error(error);

        alert(
            "No se pudo numerar el PDF."
        );

    }

}



/* =========================================================
   EXTRAER / DIVIDIR PDF
   ========================================================= */

async function splitPDF() {

    if (!selectedFiles.length) {

        alert(
            "Seleccioná un PDF."
        );

        return;

    }


    const input =
        document.getElementById(
            "splitPages"
        );


    const value =
        input.value.trim();


    if (!value) {

        alert(
            "Indicá las páginas. Ejemplo: 1,3,5-7"
        );

        return;

    }


    try {

        const bytes =
            await selectedFiles[0]
                .arrayBuffer();


        const source =
            await PDFLib.PDFDocument.load(bytes);


        const indexes =
            parsePageSelection(
                value,
                source.getPageCount()
            );


        if (!indexes.length) {

            alert(
                "No se encontraron páginas válidas."
            );

            return;

        }


        const output =
            await PDFLib.PDFDocument.create();


        const pages =
            await output.copyPages(
                source,
                indexes
            );


        pages.forEach(
            page =>
                output.addPage(page)
        );


        const result =
            await output.save();


        downloadBlob(
            result,
            "ADMLEAN-PAGINAS-EXTRAIDAS.pdf",
            "application/pdf"
        );


    } catch (error) {

        console.error(error);

        alert(
            "No se pudieron extraer las páginas."
        );

    }

}



/* =========================================================
   PARSER DE PÁGINAS
   ========================================================= */

function parsePageSelection(
    input,
    total
) {

    const pages = new Set();


    const parts =
        input.split(",");


    for (const part of parts) {

        const value =
            part.trim();


        if (!value) continue;


        if (value.includes("-")) {

            const range =
                value.split("-");


            const start =
                parseInt(range[0], 10);


            const end =
                parseInt(range[1], 10);


            if (
                Number.isNaN(start) ||
                Number.isNaN(end)
            ) {

                continue;

            }


            const from =
                Math.min(
                    start,
                    end
                );


            const to =
                Math.max(
                    start,
                    end
                );


            for (
                let page = from;
                page <= to;
                page++
            ) {

                if (
                    page >= 1 &&
                    page <= total
                ) {

                    pages.add(
                        page - 1
                    );

                }

            }

        } else {

            const page =
                parseInt(
                    value,
                    10
                );


            if (
                page >= 1 &&
                page <= total
            ) {

                pages.add(
                    page - 1
                );

            }

        }

    }


    return Array.from(
        pages
    ).sort(
        (a, b) => a - b
    );

}



/* =========================================================
   COMPRESIÓN BÁSICA
   ========================================================= */

async function compressPDF() {

    if (!selectedFiles.length) {

        alert(
            "Seleccioná un PDF."
        );

        return;

    }


    alert(
        "La compresión avanzada será incorporada con un motor específico para mantener una buena relación entre peso y calidad."
    );

}



/* =========================================================
   DESCARGA
   ========================================================= */

function downloadBlob(
    data,
    filename,
    type
) {

    const blob =
        new Blob(
            [data],
            {
                type
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download = filename;


    document.body.appendChild(link);


    link.click();


    link.remove();


    setTimeout(
        () => URL.revokeObjectURL(url),
        1000
    );

}



/* =========================================================
   FORMATEAR TAMAÑO
   ========================================================= */

function formatBytes(bytes) {

    if (bytes === 0) {
        return "0 Bytes";
    }


    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        parseFloat(
            (
                bytes /
                Math.pow(
                    1024,
                    index
                )
            ).toFixed(2)
        )
        + " "
        + units[index]
    );

}



/* =========================================================
   SEGURIDAD HTML
   ========================================================= */

function escapeHtml(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}



/* =========================================================
   CERRAR MODAL HACIENDO CLICK AFUERA
   ========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "toolModal"
            );


        if (
            event.target ===
            modal
        ) {

            closeTool();

        }

    }
);



/* =========================================================
   MENSAJE DE ARRANQUE
   ========================================================= */

console.log(
    "%c ADMLEAN ",
    "background:#2f7cff;color:white;font-size:18px;font-weight:bold;padding:8px;"
);


console.log(
    "Sistema administrativo iniciado correctamente."
);
