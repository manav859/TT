# Generates favicons from the square brand-icon source art using System.Drawing.
# Trims the heavy uniform padding, re-pads to ~12%, then exports a clean PNG.
Add-Type -AssemblyName System.Drawing

function Make-Favicon {
    param([string]$Src, [string]$Out, [int]$Size)

    $orig = [System.Drawing.Image]::FromFile($Src)

    # 1. Downscale to a small working copy so the pixel scan is fast.
    $work = New-Object System.Drawing.Bitmap 400, 400
    $g = [System.Drawing.Graphics]::FromImage($work)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($orig, 0, 0, 400, 400)
    $g.Dispose(); $orig.Dispose()

    # 2. Background = corner pixel. Find bbox of everything that differs from it.
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

    # 3. Square bbox + 12% padding, centered.
    $w = $maxX - $minX; $h = $maxY - $minY
    $side = [Math]::Max($w, $h)
    $pad = [int]($side * 0.12)
    $box = $side + 2 * $pad
    $cx = ($minX + $maxX) / 2; $cy = ($minY + $maxY) / 2
    $srcX = $cx - $box / 2; $srcY = $cy - $box / 2

    # 4. Render the cropped, padded square down to the final favicon size.
    #    NB: use $canvas (not $out) — PowerShell vars are case-insensitive, so
    #    $out would collide with the $Out path parameter.
    $canvas = New-Object System.Drawing.Bitmap $Size, $Size
    $g2 = [System.Drawing.Graphics]::FromImage($canvas)
    $g2.InterpolationMode = 'HighQualityBicubic'
    $g2.PixelOffsetMode = 'HighQuality'
    $brush = New-Object System.Drawing.SolidBrush $bg
    $g2.FillRectangle($brush, 0, 0, $Size, $Size)
    $destRect = New-Object System.Drawing.Rectangle 0, 0, $Size, $Size
    $g2.DrawImage($work, $destRect, $srcX, $srcY, $box, $box, [System.Drawing.GraphicsUnit]::Pixel)
    $canvas.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
    $g2.Dispose(); $canvas.Dispose(); $work.Dispose()
    Write-Host "wrote $Out ($Size x $Size)"
}

$logo = "public/logo"
Make-Favicon "$logo/Icon with BG white.jpg.jpeg" "public/favicon.png" 64
Make-Favicon "$logo/Icon with BG.jpg.jpeg" "public/favicon-white.png" 64
Make-Favicon "$logo/Icon with BG.jpg.jpeg" "public/apple-touch-icon.png" 180
