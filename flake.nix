{
  description = "Development environment for the Steptember leaderboard";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs = { self, nixpkgs, ... }:
    let
      supportedSystems = [
        "aarch64-darwin"
        "x86_64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    in
    {
      packages = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          nodejs = pkgs.nodejs_22;
        in
        {
          vercel = pkgs.buildNpmPackage {
            pname = "vercel-cli";
            version = "59.11.2";
            src = ./nix/vercel-cli;

            npmDepsHash = "sha256-Mw9U3NHGHhinnnTr2rlrHj2VDCOJFmd/jCF9DG3BYMo=";
            dontNpmBuild = true;

            nativeBuildInputs = [ pkgs.makeWrapper ];

            installPhase = ''
              runHook preInstall

              mkdir -p "$out/lib/vercel-cli" "$out/bin"
              cp -R node_modules "$out/lib/vercel-cli/"

              makeWrapper ${nodejs}/bin/node "$out/bin/vercel" \
                --add-flags "$out/lib/vercel-cli/node_modules/vercel/dist/vc.js" \
                --set NODE_EXTRA_CA_CERTS "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
              ln -s vercel "$out/bin/vc"

              runHook postInstall
            '';

            meta.mainProgram = "vercel";
          };

          default = self.packages.${system}.vercel;
        });

      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = [
              pkgs.nodejs_22
              self.packages.${system}.vercel
            ];
          };
        });
    };
}
