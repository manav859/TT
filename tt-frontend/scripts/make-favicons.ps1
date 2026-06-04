# Generates favicons from the brand-icon source art using System.Drawing.
#
# The browser-tab favicons use the TRANSPARENT mark (no solid tile), trimmed and
# padded into a SQUARE so the portrait artwork is not stretched into the square
# favicon slot. The Apple touch icon keeps a solid background because iOS flattens
# transparency to black (a transparent dark mark would vanish).
Add-Type -AssemblyName System.Drawing
# .NET uses the process CWD (not PowerShell's $PWD) to resolve relative paths,
# so anchor it to tt-frontend/ regardless of where the script is invoked from.
[System.IO.Directory]::SetCurrentDirectory((Resolve-Path (Join-Path $PSScriptRoot '..')).Path)

# --- Transparent, square favicon from a transparent PNG source -----------------
function Make-TransparentFavicon {
    param([string]$Src, [string]$Out, [int]$Size)

    $orig = [System.Drawing.Image]::FromFile($Src)

    # Working copy at 600px (keep aspect) on a transparent ARGB surface.
    $ratio = [double]$orig.Width / $orig.Height
    if ($ratio -ge 1) { $ww = 600; $wh = [int](600 / $ratio) } else { $wh = 600; $ww = [int](600 * $ratio) }
    $work = New-Object System.Drawing.Bitmap $ww, $wh, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($work)
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($orig, 0, 0, $ww, $wh)
    $g.Dispose(); $orig.Dispose()

    # Bounding box of non-transparent pixels.
    $minX = $ww; $minY = $wh; $maxX = 0; $maxY = 0
    for ($y = 0; $y -lt $wh; $y++) {
        for ($x = 0; $x -lt $ww; $x++) {
            if ($work.GetPixel($x, $y).A -gt 20) {
                if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    # Square crop region + 9% padding, centered on the mark.
    $w = $maxX - $minX; $h = $maxY - $minY
    $side = [Math]::Max($w, $h)
    $pad = [int]($side * 0.09)
    $box = $side + 2 * $pad
    $cx = ($minX + $maxX) / 2; $cy = ($minY + $maxY) / 2
    $srcX = $cx - $box / 2; $srcY = $cy - $box / 2

    $canvas = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g2 = [System.Drawing.Graphics]::FromImage($canvas)
    $g2.Clear([System.Drawing.Color]::Transparent)
    $g2.InterpolationMode = 'HighQualityBicubic'
    $g2.PixelOffsetMode = 'HighQuality'
    $destRect = New-Object System.Drawing.Rectangle 0, 0, $Size, $Size
    $g2.DrawImage($work, $destRect, $srcX, $srcY, $box, $box, [System.Drawing.GraphicsUnit]::Pixel)
    $canvas.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
    $g2.Dispose(); $canvas.Dispose(); $work.Dispose()
    Write-Host "wrote $Out ($Size x $Size, transparent)"
}

# --- Solid-bg square icon (for Apple touch) ------------------------------------
function Make-SolidFavicon {
    param([string]$Src, [string]$Out, [int]$Size)
    $orig = [System.Drawing.Image]::FromFile($Src)
    $work = New-Object System.Drawing.Bitmap 400, 400
    $g = [System.Drawing.Graphics]::FromImage($work)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($orig, 0, 0, 400, 400)
    $g.Dispose(); $orig.Dispose()
    $bg = $work.GetPixel(5, 5)
    $minX = 400; $minY = 400; $maxX = 0; $maxY = 0
    for ($y = 0; $y -lt 400; $y++) {
        for ($x = 0; $x -lt 400; $x++) {
            $p = $work.GetPixel($x, $y)
            $d = [Math]::Abs($p.R - $bg.R) + [Math]::Abs($p.G - $bg.G) + [Math]::Abs($p.B - $bg.B)
            if ($d -gt 60) {
                if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    $w = $maxX - $minX; $h = $maxY - $minY
    $side = [Math]::Max($w, $h); $pad = [int]($side * 0.12); $box = $side + 2 * $pad
    $cx = ($minX + $maxX) / 2; $cy = ($minY + $maxY) / 2
    $srcX = $cx - $box / 2; $srcY = $cy - $box / 2
    $canvas = New-Object System.Drawing.Bitmap $Size, $Size
    $g2 = [System.Drawing.Graphics]::FromImage($canvas)
    $g2.InterpolationMode = 'HighQualityBicubic'; $g2.PixelOffsetMode = 'HighQuality'
    $brush = New-Object System.Drawing.SolidBrush $bg
    $g2.FillRectangle($brush, 0, 0, $Size, $Size)
    $destRect = New-Object System.Drawing.Rectangle 0, 0, $Size, $Size
    $g2.DrawImage($work, $destRect, $srcX, $srcY, $box, $box, [System.Drawing.GraphicsUnit]::Pixel)
    $canvas.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
    $g2.Dispose(); $canvas.Dispose(); $work.Dispose()
    Write-Host "wrote $Out ($Size x $Size, solid)"
}

$logo = "public/logo"
Make-TransparentFavicon "$logo/sub-logo-black.png" "public/favicon.png" 64
Make-TransparentFavicon "$logo/icon-white.png" "public/favicon-white.png" 64
Make-SolidFavicon "$logo/Icon with BG.jpg.jpeg" "public/apple-touch-icon.png" 180
