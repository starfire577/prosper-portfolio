export const categories = ['All projects', 'Support', 'Cloud', 'Networking', 'Security', 'Scripting'];

export const projects = [
  {
    id: 'windows-server',
    title: 'Windows Server & Active Directory',
    type: 'Design proposal',
    categories: ['Support', 'Networking'],
    icon: 'server',
    color: 'blue',
    tags: ['Windows Server 2022', 'Active Directory', 'Group Policy'],
    summary: 'Designed identity, network services, and workstation policies for a 50-person data center scenario.',
    context: 'The PromisedLand.com scenario called for a Windows Server environment to support 50 employees and regional call center operations.',
    work: [
      'Designed an Active Directory hierarchy with departmental organizational units, role-based access, and Group Policy for workstations.',
      'Planned DNS zones, DHCP address allocation, secure file shares, and storage and backup policies.',
      'Documented Hyper-V, Microsoft 365 integration, and offsite recovery as part of a hybrid infrastructure design.'
    ],
    result: 'Produced a deployment proposal covering server roles, addressing, permissions, and recovery. In separate VirtualBox coursework, I configured Active Directory, DNS, DHCP, and Group Policy.',
    evidence: [{ label: 'Read the Windows Server proposal', file: 'PromisedLand_WindowsServer_Proposal.pdf', kind: 'PDF' }]
  },
  {
    id: 'multi-site-wan',
    title: 'Multi-site WAN simulation',
    type: 'Network simulation',
    categories: ['Networking'],
    icon: 'network',
    color: 'mint',
    tags: ['Cisco Packet Tracer', 'VLANs', 'IPv4 subnetting'],
    summary: 'Built a routed topology connecting Lagos, Benin, and Delta, with segmented LANs and a shared DNS server.',
    context: 'The simulation models three offices that need local network segmentation and connectivity between sites.',
    work: [
      'Designed the three-site topology and assigned site subnets and point-to-point link networks within a single IPv4 address block.',
      'Segmented the Benin site into VLANs and represented wired and wireless clients alongside the routing and switching infrastructure.',
      'Placed a DNS server at Lagos and documented the site and link subnets in the topology.'
    ],
    result: 'Produced a labeled topology and an editable Packet Tracer file for inspecting the design and configurations.',
    evidence: [
      { label: 'View the original topology', file: 'Cisco.png', kind: 'PNG' },
      { label: 'Download the Packet Tracer lab', file: 'Multi_Site_Network.pkt', kind: 'PKT' }
    ],
    preview: { file: 'Cisco.png', alt: 'Original Packet Tracer topology showing routers, switches, and hosts at Lagos, Benin, and Delta.' }
  },
  {
    id: 'linux-file-server',
    title: 'Linux file server & access control',
    type: 'Design proposal',
    categories: ['Support', 'Security'],
    icon: 'terminal',
    color: 'violet',
    tags: ['Linux', 'ext4', 'Least privilege'],
    summary: 'Planned shared storage, departmental permissions, and server hardening for a 38-person organization.',
    context: 'PromisedLand.com needed a centralized Linux file server that could keep departmental data separate while giving leadership read-only oversight.',
    work: [
      'Designed an ext4 partition layout with separate volumes for shared files, system logs, and temporary files.',
      'Defined departmental groups, shared directories, and access rights, including read-only access for the CIO.',
      'Documented a host firewall, restricted administrative access, update procedures, and audit logging.'
    ],
    result: 'Produced a Linux deployment proposal that ties storage, permissions, and hardening decisions to the organization’s needs.',
    evidence: [{ label: 'Read the Linux deployment proposal', file: 'PromisedLand_LinuxDeployment.pdf', kind: 'PDF' }]
  },
  {
    id: 'azure-arm',
    title: 'Azure infrastructure with ARM templates',
    type: 'Coursework lab',
    categories: ['Cloud', 'Scripting'],
    icon: 'cloud',
    color: 'blue',
    tags: ['Microsoft Azure', 'ARM templates', 'Azure CLI'],
    summary: 'Deployed an Azure storage resource from a template and added reusable inputs and deployment output.',
    context: 'In IT330 Azure Technologies, I worked through an infrastructure-as-code exercise to deploy an Azure storage account from a JSON template.',
    work: [
      'Created an ARM template and successfully deployed the storage resource from VS Code.',
      'Extended the template with storage account name constraints and a parameter for the storage SKU.',
      'Added a deployment output to expose a value after deployment.'
    ],
    result: 'Completed the initial Azure deployment and extended the template to make the configuration reusable across environments.',
    evidence: []
  },
  {
    id: 'terraform-proxmox',
    title: 'Terraform VM provisioning on Proxmox',
    type: 'Coursework lab',
    categories: ['Scripting', 'Cloud'],
    icon: 'layers',
    color: 'violet',
    tags: ['Terraform', 'Proxmox', 'Ubuntu'],
    summary: 'Provisioned an Ubuntu virtual machine from a template using infrastructure as code.',
    context: 'As part of IT316, I used Terraform from a Windows workstation to provision a VM in a school Proxmox lab.',
    work: [
      'Wrote a Terraform configuration for the Proxmox provider and VM settings, using an existing Ubuntu template.',
      'Troubleshot authentication and provider configuration before applying the deployment.',
      'Captured the Terraform output and Proxmox console evidence for the lab.'
    ],
    result: 'Successfully applied the configuration and created the Ubuntu VM in Proxmox.',
    evidence: []
  },
  {
    id: 'python-security-lab',
    title: 'Python TCP security lab',
    type: 'Coursework lab',
    categories: ['Security', 'Scripting', 'Networking'],
    icon: 'shield',
    color: 'mint',
    tags: ['Python', 'TCP sockets', 'Kali Linux'],
    summary: 'Tested client–server communication and reviewed socket and thread behavior in an isolated security lab.',
    context: 'In IT316 Scripting for Security Operations, I used a controlled lab to understand how a basic command-and-control session exchanges data.',
    work: [
      'Worked with Python TCP sockets and separate send and receive threads for two-way communication.',
      'Connected a Windows client to a Kali Linux server and checked how results were returned.',
      'Verified a reversible test change and observed how the server handled a connection failure.'
    ],
    result: 'Confirmed command and response flow between the lab machines and documented how sockets, threads, and error handling shaped the session.',
    evidence: []
  },
  {
    id: 'hotel-cloud',
    title: 'Cloud migration plan for hospitality',
    type: 'Design proposal',
    categories: ['Cloud', 'Security'],
    icon: 'cloud',
    color: 'amber',
    tags: ['SaaS', 'Cloud storage', 'Vendor evaluation'],
    summary: 'Evaluated SaaS, backup, and connectivity options for a two-location hotel operation.',
    context: 'The Kentlois Hotel and Suites proposal evaluated how a small hospitality business could adopt cloud services with limited on-site IT resources.',
    work: [
      'Assessed existing connectivity, backup internet procedures, and operational gaps.',
      'Proposed SaaS for reservations, billing, and point-of-sale workflows, alongside cloud file storage and backup.',
      'Compared vendor, licensing, and service-level considerations and documented migration, security, and governance risks.'
    ],
    result: 'Produced a decision document covering service selection, operational costs, migration, and risk.',
    evidence: [{ label: 'Read the Kentlois cloud proposal', file: 'Kentlois_Proposal.pdf', kind: 'PDF' }]
  }
];
