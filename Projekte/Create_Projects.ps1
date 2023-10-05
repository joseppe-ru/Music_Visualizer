$Files = Get-ChildItem -File
$Folders = Get-ChildItem -Exclude $Files 
$script_endung = ".\*ps1"
#Schleife sucht shell-scripte aus jedem Projekt herraus
foreach ($Project in $Folders){
    $Project
    cd $Project
    $script = Get-ChildItem -file -Name *.ps1 
    #[Diagnostics.Process]::Start("powershell.exe",$Files)
    & .\$script
    cd ..
}

