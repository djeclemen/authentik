const docsSidebar = require("./sidebars.js");
const generateVersionDropdown =
    require("./src/utils.js").generateVersionDropdown;

module.exports = {
    integrations: [
        {
            type: "html",
            value: generateVersionDropdown(docsSidebar),
        },
        {
            type: "doc",
            id: "index",
        },
        {
            type: "category",
            label: "Applications",
            collapsed: false,
            link: {
                type: "doc",
                id: "services/index",
            },
            items: [
                {
                    type: "category",
                    label: "Chat, Communication & Collaboration",
                    items: [
                        "services/bookstack/index",
                        "services/dokuwiki/index",
                        "services/hedgedoc/index",
                        "services/kimai/index",
                        "services/mastodon/index",
                        "services/matrix-synapse/index",
                        "services/mobilizon/index",
                        "services/nextcloud/index",
                        "services/onlyoffice/index",
                        "services/outline/index",
                        "services/paperless-ng/index",
                        "services/paperless-ngx/index",
                        "services/rocketchat/index",
                        "services/roundcube/index",
                        "services/sharepoint-se/index",
                        "services/slack/index",
                        "services/vikunja/index",
                        "services/wekan/index",
                        "services/wiki-js/index",
                        "services/writefreely/index",
                        "services/zulip/index",
                    ],
                },
                {
                    type: "category",
                    label: "Cloud Providers",
                    items: [
                        "services/aws/index",
                        "services/google/index",
                        "services/hashicorp-cloud/index",
                        "services/oracle-cloud/index",
                    ],
                },
                {
                    type: "category",
                    label: "Dashboards",
                    items: ["services/organizr/index"],
                },
                {
                    type: "category",
                    label: "Hypervisors / Orchestrators",
                    items: [
                        "services/portainer/index",
                        "services/proxmox-ve/index",
                        "services/rancher/index",
                        "services/xen-orchestra/index",
                        "services/vmware-vcenter/index",
                    ],
                },
                {
                    type: "category",
                    label: "Infrastructure",
                    items: [
                        "services/apache-guacamole/index",
                        "services/argocd/index",
                        "services/awx-tower/index",
                        "services/cloudflare-access/index",
                        "services/globalprotect/index",
                        "services/harbor/index",
                        "services/hashicorp-vault/index",
                        "services/jenkins/index",
                        "services/minio/index",
                        "services/netbox/index",
                        "services/pgadmin/index",
                        "services/phpipam/index",
                        "services/powerdns-admin/index",
                        "services/proftpd/index",
                        "services/qnap-nas/index",
                        "services/synology-dsm/index",
                        "services/skyhigh/index",
                        "services/snipe-it/index",
                        "services/sssd/index",
                        "services/truecommand/index",
                        "services/veeam-enterprise-manager/index",
                        "services/zammad/index",
                    ],
                },
                {
                    type: "category",
                    label: "Networking",
                    items: [
                        "services/firezone/index",
                        "services/fortigate-admin/index",
                        "services/fortigate-ssl/index",
                        "services/fortimanager/index",
                        "services/opnsense/index",
                        "services/pfsense/index",
                    ],
                },
                {
                    type: "category",
                    label: "Miscellaneous",
                    items: [
                        "services/engomo/index",
                        "services/freshrss/index",
                        "services/gravitee/index",
                        "services/home-assistant/index",
                        "services/immich/index",
                        "services/jellyfin/index",
                        "services/node-red/index",
                        "services/sonar-qube/index",
                        "services/sonarr/index",
                        "services/tautulli/index",
                        "services/weblate/index",
                    ],
                },
                {
                    type: "category",
                    label: "Monitoring",
                    items: [
                        "services/gatus/index",
                        "services/glitchtip/index",
                        "services/grafana/index",
                        "services/observium/index",
                        "services/sentry/index",
                        "services/ubuntu-landscape/index",
                        "services/uptime-kuma/index",
                        "services/zabbix/index",
                    ],
                },
                {
                    type: "category",
                    label: "Platforms",
                    items: [
                        "services/budibase/index",
                        "services/wordpress/index",
                    ],
                },
                {
                    type: "category",
                    label: "Version Control Systems",
                    items: [
                        "services/gitea/index",
                        "services/github-enterprise-cloud/index",
                        "services/github-enterprise-server/index",
                        "services/github-organization/index",
                        "services/gitlab/index",
                    ],
                },
            ],
        },
    ],
};
